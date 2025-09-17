"use client";

import type {
  SurveyModel,
  SurveyQuestion,
} from "@/feature/survey/model/survey.model";
import { useMemo, useState } from "react";
import { EditableTitle } from "./components/editable-title";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { BackButton } from "@/shared/components/back-button";
import { Button } from "@/shared/components/button";
import { Form } from "@/shared/components/ui/form";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useTranslation } from "@/shared/hooks/use-translation";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Check, Plus } from "lucide-react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { QuestionsForm } from "../questions-form-preview";
import { SortableQuestionItem } from "./components/sortable-question-item";
import { SurveyModal } from "./components/survey-modal";

interface Props {
  onSubmit?: (
    survey: SurveyModel & {
      deletedQuestionIds: string[];
      newQuestionIds: string[];
    }
  ) => void;
  loading?: boolean;
  buttonSubmitText: string;
}

export const SurveyForm = ({ loading, onSubmit, buttonSubmitText }: Props) => {
  const { control, watch, handleSubmit, getValues, setValue } =
    useFormContext<SurveyModel>();

  const { fields, update, remove } = useFieldArray({
    control,
    name: "questions",
    keyName: "key",
  });

  const { t } = useTranslation("surveys");
  const surveyTitle = watch("title");
  const surveyQuestions = watch("questions");

  const [deletedQuestionIds, setDeletesQuestionIds] = useState<string[]>([]);
  const [newQuestionIds, setNewQuestionIds] = useState<string[]>([]);

  const renumberPages = (questions: SurveyQuestion[]): SurveyQuestion[] => {
    if (questions?.length === 0) {
      return [];
    }

    const uniquePageIndexes = [
      ...new Set(questions?.map((q) => q.pageIndex)),
    ].sort((a, b) => a - b);

    const pageMap = uniquePageIndexes.reduce((acc, oldIndex, newIndex) => {
      acc[oldIndex] = newIndex + 1;
      return acc;
    }, {} as Record<number, number>);

    return questions?.map((q) => ({
      ...q,
      pageIndex: pageMap[q.pageIndex],
    }));
  };

  const addNewQuestion = (newQuestion: SurveyQuestion) => {
    const updatedQuestions = [...surveyQuestions, newQuestion];

    const renumberedQuestions = renumberPages(updatedQuestions);

    setValue("questions", renumberedQuestions, { shouldDirty: true });
    toast.success(t("createSurvey.toasts.addQuestionSuccess"));
    setNewQuestionIds((state) => [...state, newQuestion.id]);
  };

  const updateQuestion = (updatedQuestion: SurveyQuestion) => {
    const index = fields.findIndex((field) => field.id === updatedQuestion.id);
    if (index > -1) {
      update(index, updatedQuestion);
      toast.success(t("createSurvey.toasts.updateQuestionSuccess"));
    }
  };

  const deleteQuestion = (questionId: string) => {
    const currentQuestions = getValues("questions");
    const dependencyQuestion = currentQuestions.find(
      (q) => q.conditional?.fieldId === questionId
    );

    if (dependencyQuestion?.label) {
      const label = t("createSurvey.toasts.confirm", {
        dependencyQuestion: dependencyQuestion.label,
      });
      if (confirm(label)) {
        deleteQuestion(dependencyQuestion.id);
      }
    }

    const index = fields.findIndex((field) => field.id === questionId);
    if (index > -1) {
      remove(index);
      const remainingQuestions = getValues("questions");
      const renumberedQuestions = renumberPages(remainingQuestions);
      setValue("questions", renumberedQuestions);
      toast.success(t("createSurvey.toasts.deleteQuestion"));
    }
    setDeletesQuestionIds((state) => [...state, questionId]);
  };

  const handleTitleChange = (newTitle: string) => {
    setValue("title", newTitle, { shouldDirty: true });
  };

  const previewForm = useForm({ mode: "onTouched", shouldUnregister: false });
  const [isModalOpen, toggleModal] = useToggle(false);
  const [questionToEdit, setQuestionToEdit] = useState<SurveyQuestion | null>(
    null
  );

  const handleOpenToAdd = () => {
    setQuestionToEdit(null);
    toggleModal();
  };

  const handleOpenToEdit = (question: SurveyQuestion) => {
    setQuestionToEdit(question);
    toggleModal();
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const currentQuestions = getValues("questions");

    const activeIndex = currentQuestions.findIndex((q) => q.id === active.id);
    const overIndex = currentQuestions.findIndex((q) => q.id === over.id);

    if (activeIndex === -1 || overIndex === -1) return;

    const questionsWithMovedItem = arrayMove(
      currentQuestions,
      activeIndex,
      overIndex
    );

    const activeContainerId = active.data.current?.sortable.containerId;
    const overContainerId = over.data.current?.sortable.containerId || over.id;
    if (activeContainerId !== overContainerId) {
      const newPageIndex = Number(String(overContainerId).replace("page-", ""));
      const questionToUpdate = questionsWithMovedItem.find(
        (q) => q.id === active.id
      );
      if (questionToUpdate) {
        questionToUpdate.pageIndex = newPageIndex;
      }
    }

    const questionsWithUpdatedOrder = questionsWithMovedItem.map((question) => {
      const questionsOnSamePage = questionsWithMovedItem.filter(
        (q) => q.pageIndex === question.pageIndex
      );
      const orderIndex = questionsOnSamePage.findIndex(
        (q) => q.id === question.id
      );
      return { ...question, orderIndex };
    });

    const movedItem = questionsWithUpdatedOrder.find((q) => q.id === active.id);
    if (movedItem?.conditional) {
      const dependencyItem = questionsWithUpdatedOrder.find(
        (q) => q.id === movedItem.conditional!.fieldId
      );
      if (dependencyItem) {
        const movedPosition = movedItem.pageIndex + movedItem.orderIndex / 100;
        const dependencyPosition =
          dependencyItem.pageIndex + dependencyItem.orderIndex / 100;
        if (movedPosition < dependencyPosition) {
          toast.error(t("createSurvey.toasts.dragError"));
          return;
        }
      }
    }

    const finalQuestions = renumberPages(questionsWithUpdatedOrder);

    setValue("questions", finalQuestions, { shouldDirty: true });
  }

  const groupedQuestions = useMemo(() => {
    return surveyQuestions.reduce((acc, question) => {
      const page = question.pageIndex;
      if (!acc[page]) {
        acc[page] = [];
      }
      acc[page].push(question);
      acc[page].sort((a, b) => a.orderIndex - b.orderIndex);
      return acc;
    }, {} as Record<number, SurveyQuestion[]>);
  }, [surveyQuestions]);

  const { company } = useAuthStore();

  const submitFunction = (values: SurveyModel) => {
    if (!company?.id || !onSubmit) {
      return;
    }

    return onSubmit({
      ...values,
      deletedQuestionIds,
      newQuestionIds,
    });
  };
  const disabledCreateButton = loading || surveyQuestions?.length === 0;
  const onPreviewSubmit = () => {
    toast.success(t("createSurvey.toasts.previewSubmit"));
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 ">
      <div className="mb-5 w-full flex flex-col md:flex-row md:justify-between items-center gap-3">
        <BackButton className="mb-2 md:mb-0">
          <EditableTitle
            initialTitle={surveyTitle}
            onSave={handleTitleChange}
            className="text-xl font-bold text-card-foreground"
          />
        </BackButton>

        <Button
          onClick={handleSubmit(submitFunction)}
          size={"sm"}
          disabled={disabledCreateButton}
        >
          {buttonSubmitText} <Check className="ml-1 h-5 w-5" />
        </Button>
      </div>

      <div className="w-full flex flex-col md:flex-row md:max-w-[90%]  gap-4 items-center justify-center ">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="w-full max-w-[600px] flex-1 min-h-[500px]  h-[calc(100vh-160px)]  overflow-y-auto flex flex-col gap-4 border p-4 rounded-lg bg-card shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-card-foreground text-xl">
                {t("createSurvey.editController.title")}
              </h4>
              <Button onClick={handleOpenToAdd} size={"sm"}>
                {t("createSurvey.buttons.addQuestion")}
                <Plus className="ml-1 h-5 w-5" />
              </Button>
            </div>
            {surveyQuestions?.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                {t("createSurvey.editController.defaultMessage")}
              </p>
            )}
            {Object.entries(groupedQuestions).map(
              ([pageIndex, questionsInPage]) => {
                const page = t("createSurvey.editController.page", {
                  page: String(pageIndex),
                });
                return (
                  <div
                    key={`page-${pageIndex}`}
                    className="p-2 border rounded-lg bg-background"
                  >
                    {pageIndex && (
                      <h3 className="font-bold mb-2 text-center text-sm text-muted-foreground">
                        {page}
                      </h3>
                    )}

                    <SortableContext
                      items={questionsInPage.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                      id={`page-${pageIndex}`}
                    >
                      <div className="flex flex-col gap-2">
                        {questionsInPage.map((q, index) => (
                          <SortableQuestionItem
                            key={q.id}
                            index={index}
                            question={q}
                            onDelete={deleteQuestion}
                            onEdit={handleOpenToEdit}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </div>
                );
              }
            )}
          </div>
        </DndContext>
        {surveyQuestions && (
          <Form {...previewForm}>
            <div className="w-full max-w-[600px] flex-1 h-[calc(100vh-160px)]">
              <QuestionsForm
                isPreview
                logoUrl={company?.logoUrl}
                questions={surveyQuestions}
                onSubmit={onPreviewSubmit}
              />
            </div>
          </Form>
        )}{" "}
      </div>
      <SurveyModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onAddQuestion={addNewQuestion}
        onUpdateQuestion={updateQuestion}
        existingQuestions={surveyQuestions || []}
        questionToEdit={questionToEdit}
      />
    </div>
  );
};
