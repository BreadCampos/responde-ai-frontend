import { useState, useMemo } from "react";
import { EditableTitle } from "./components/editable-title";
import type {
  SurveyModel,
  SurveyQuestion,
} from "@/application/feature/survey/model/survey.model";

import { Form } from "@/application/shared/components/ui/form";
import { ServeyModal } from "./components/survey-modal";
import { useForm } from "react-hook-form";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableQuestionItem } from "./components/sortable-question-item";
import { toast } from "sonner";
import { Button } from "@/application/shared/components/button";
import { useToggle } from "@/application/shared/hooks/use-toggle";
import { BackButton } from "@/application/shared/components/back-button";
import { Check, Plus } from "lucide-react";
import { CreateSurveyMutation } from "../../service/create-survey.mutation";
import { QuestionsFormPreview } from "../questions-form-preview";
import { useAuthStore } from "@/application/feature/authentication/store/use-auth.store";

export const SurveyForm = () => {
  const [survey, setSurvey] = useState<SurveyModel>({
    title: "Feedback de Produto e Experiência do Usuário",
    questions: [
      // --- PÁGINA 1: DADOS BÁSICOS ---
      {
        id: "3ccd1506-de25-453a-b7ec-8a2b1aa349a5",
        label: "Primeiro, qual o seu nome?",
        type: "text",
        placeholder: "Digite seu nome completo",
        pageIndex: 1,
        orderIndex: 0,
        validations: [
          {
            type: "required",
            errorMessage: "O nome é obrigatório.",
          },
          {
            type: "min_length",
            options: { value: 3 },
            errorMessage: "Por favor, insira um nome com pelo menos 3 letras.",
          },
        ],
      },
      {
        id: "43abd582-b8b9-4672-94f6-a2ccdc3508cb",
        label: "E o seu melhor e-mail?",
        type: "text",
        placeholder: "exemplo@dominio.com",
        hint: "Usado apenas para comunicação sobre a pesquisa.",
        pageIndex: 1,
        orderIndex: 1,
        validations: [
          { type: "required" },
          {
            type: "email",
            errorMessage: "Por favor, insira um formato de e-mail válido.",
          },
        ],
      },
      {
        id: "89f7e8b7-3f3c-4cc3-b56b-aa45091fcff3",
        label:
          "Você aceita receber um contato por telefone para falarmos sobre sua experiência?",
        type: "radio",
        pageIndex: 1,
        orderIndex: 2,
        selectOptions: [
          { label: "Sim, aceito", value: "yes" },
          {
            label: "Não, prefiro não ser contatado",
            value: "no",
          },
        ],
        validations: [{ type: "required" }],
      },
      {
        id: "feefe4e7-f64b-42dc-9d8a-9453051a0ee5",
        label: "Ótimo! Qual o seu telefone com DDD?",
        type: "text",
        placeholder: "(00) 00000-0000",
        pageIndex: 1,
        orderIndex: 3,
        mask: ["(00) 0000-0000", "(00) 00000-0000"],
        validations: [
          {
            type: "required",
            errorMessage:
              "Estou com problema de input com mask, coloque 'não' na anterior",
          },
        ],
        conditional: {
          fieldId: "89f7e8b7-3f3c-4cc3-b56b-aa45091fcff3",
          operator: "equals",
          value: "yes",
        },
      },

      // --- PÁGINA 2: USO DO PRODUTO ---
      {
        id: "85be1757-8a5b-4ba7-ba0c-839ea48af757",
        label: "Qual de nossos produtos você mais utiliza?",
        type: "select",
        placeholder: "Selecione o produto principal",
        pageIndex: 2,
        orderIndex: 0,
        validations: [{ type: "required" }],
        selectOptions: [
          { label: "Produto Alpha", value: "alpha" },
          { label: "Produto Beta", value: "beta" },
          { label: "Produto Gamma", value: "gamma" },
        ],
      },
      {
        id: "d5b752ee-1d48-41e7-adad-dd614cef1dfc",
        label:
          "Numa escala de 1 a 5, como você avalia a facilidade de uso do produto?",
        type: "rating",
        pageIndex: 2,
        orderIndex: 1,
        validations: [{ type: "required" }],
        ratingOptions: {
          min: 1,
          max: 5,
          style: "stars",
        },
      },
      {
        id: "436b8053-5c75-4067-ba83-71a638fd6a76",
        label: "Quais destas funcionalidades você já utilizou?",
        type: "checkbox_group",
        hint: "Marque todas as opções aplicáveis.",
        pageIndex: 2,
        orderIndex: 2,
        validations: [
          {
            type: "required",
            errorMessage: "Por favor, selecione ao menos uma opção.",
          },
        ],
        selectOptions: [
          {
            label: "Dashboard de Análises",
            value: "dashboard",
          },
          {
            label: "Relatórios Customizados",
            value: "reports",
          },
          {
            label: "Suporte via Chat",
            value: "chat_support",
          },
        ],
      },
      {
        id: "053bcd41-b3bf-4e47-a6bc-143d9f36ed50",
        label: "Quando você começou a usar nosso produto?",
        type: "date",
        hint: "Pode ser uma data aproximada.",
        pageIndex: 2,
        orderIndex: 3,
        validations: [
          {
            type: "max",
            options: { value: new Date().toISOString().split("T")[0] }, // Define a data máxima como hoje
            errorMessage: "A data não pode ser no futuro.",
          },
        ],
      },

      // --- PÁGINA 3: FEEDBACK DETALHADO ---
      {
        id: "19e9bd23-a1ce-4d55-a41a-18592bbc722c",
        label:
          "De 0 a 10, o quão provável você é de nos recomendar a um amigo ou colega?",
        type: "rating",
        hint: "0 = Nada provável, 10 = Com certeza!",
        pageIndex: 3,
        orderIndex: 0,
        validations: [{ type: "required" }],
        ratingOptions: {
          min: 0,
          max: 10,
          style: "slider",
        },
      },
      {
        id: "4b512b66-4a04-44d2-8597-a16245e83f05",
        label: "Ficamos felizes com a sua nota! O que mais te agradou?",
        type: "textarea",
        placeholder: "Nos conte o que te fez dar essa nota...",
        pageIndex: 3,
        orderIndex: 1,
        conditional: {
          fieldId: "b00b06c5-96d3-455b-9d31-80aa6aa42a68",
          operator: "greater_than_equal",
          value: "9",
        },
        validations: [{ type: "required" }],
      },
      {
        id: "3040a020-c389-4b4f-8277-c9d9e9eea0b6",
        label:
          "Lamentamos por não atender suas expectativas. O que podemos fazer para melhorar?",
        type: "textarea",
        placeholder: "Seu feedback é muito importante para nós...",
        pageIndex: 3,
        orderIndex: 2,
        conditional: {
          fieldId: "14611a6b-df35-427b-9b8c-e42cc6ee1277",
          operator: "less_than_equal",
          value: "6",
        },
        validations: [{ type: "required" }],
      },
    ],
  });

  const addNewQuestion = (newQuestion: SurveyQuestion) => {
    const updatedQuestions = [...survey.questions, newQuestion];

    const renumberedQuestions = renumberPages(updatedQuestions);

    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      questions: renumberedQuestions,
    }));
    toast.success("Pergunta adicionada com sucesso.");
  };

  const updateQuestion = (updatedQuestion: SurveyQuestion) => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      questions: prevSurvey.questions.map((q) =>
        q.id === updatedQuestion.id ? updatedQuestion : q
      ),
    }));
    toast.success("Pergunta atualizada com sucesso.");
  };

  const deleteQuestion = (questionId: string) => {
    const isDependency = survey.questions.some(
      (q) => q.conditional?.fieldId === questionId
    );
    if (
      isDependency &&
      !confirm(
        "Atenção: Outra pergunta depende desta. Deseja realmente deletá-la?"
      )
    ) {
      return;
    }
    const remainingQuestions = survey.questions.filter(
      (q) => q.id !== questionId
    );

    const renumberedQuestions = renumberPages(remainingQuestions);

    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      questions: renumberedQuestions,
    }));

    toast.success("Pergunta deletada com sucesso.");
  };

  const handleTitleChange = (newTitle: string) => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      title: newTitle,
    }));
  };

  const methods = useForm({ mode: "onTouched", shouldUnregister: false });
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

  const renumberPages = (questions: SurveyQuestion[]): SurveyQuestion[] => {
    if (questions.length === 0) {
      return [];
    }

    const uniquePageIndexes = [
      ...new Set(questions.map((q) => q.pageIndex)),
    ].sort((a, b) => a - b);

    const pageMap = uniquePageIndexes.reduce((acc, oldIndex, newIndex) => {
      acc[oldIndex] = newIndex + 1;
      return acc;
    }, {} as Record<number, number>);

    return questions.map((q) => ({
      ...q,
      pageIndex: pageMap[q.pageIndex],
    }));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const activeContainerId = active.data.current?.sortable.containerId;
    const overContainerId = over.data.current?.sortable.containerId || over.id;

    let updatedQuestions = [...survey.questions];
    const activeIndex = updatedQuestions.findIndex((q) => q.id === active.id);
    const overIndex = updatedQuestions.findIndex((q) => q.id === over.id);

    if (activeIndex === -1) return;

    if (activeContainerId !== overContainerId) {
      const newPageIndex = Number(String(overContainerId).replace("page-", ""));
      updatedQuestions[activeIndex] = {
        ...updatedQuestions[activeIndex],
        pageIndex: newPageIndex,
      };
    }

    updatedQuestions = arrayMove(updatedQuestions, activeIndex, overIndex);

    let finalQuestions = updatedQuestions.map((question) => {
      const questionsOnSamePage = updatedQuestions.filter(
        (q) => q.pageIndex === question.pageIndex
      );
      const orderIndex = questionsOnSamePage.findIndex(
        (q) => q.id === question.id
      );
      return { ...question, orderIndex };
    });

    const movedItem = finalQuestions.find((q) => q.id === active.id);
    if (movedItem?.conditional) {
      const dependencyItem = finalQuestions.find(
        (q) => q.id === movedItem.conditional!.fieldId
      );
      if (dependencyItem) {
        const movedPosition = movedItem.pageIndex + movedItem.orderIndex / 100;
        const dependencyPosition =
          dependencyItem.pageIndex + dependencyItem.orderIndex / 100;
        if (movedPosition < dependencyPosition) {
          toast.error(
            "Movimento inválido: A pergunta não pode vir antes de sua dependência."
          );
          return;
        }
      }
    }

    finalQuestions = renumberPages(finalQuestions);

    setSurvey((prevSurvey: SurveyModel) => ({
      ...prevSurvey,
      questions: finalQuestions,
    }));
  }

  const groupedQuestions = useMemo(() => {
    return survey.questions.reduce((acc, question) => {
      const page = question.pageIndex;
      if (!acc[page]) {
        acc[page] = [];
      }
      acc[page].push(question);
      acc[page].sort((a, b) => a.orderIndex - b.orderIndex);
      return acc;
    }, {} as Record<number, SurveyQuestion[]>);
  }, [survey.questions]);

  const { company } = useAuthStore();
  const surveyMutation = CreateSurveyMutation();
  const onCreateSurvey = () => {
    if (!company?.id) {
      return;
    }
    surveyMutation.mutate({
      companyId: company?.id,
      survey,
    });
  };
  const disabledCreateButton =
    surveyMutation.isPending || survey.questions.length === 0;

  return (
    <Form {...methods}>
      <div className="flex flex-col items-center justify-center p-2 ">
        <div className="mb-4 text-left flex justify-between items-center w-full">
          <BackButton>
            <EditableTitle
              initialTitle={survey.title}
              onSave={handleTitleChange}
              className="text-2xl font-bold text-card-foreground"
            />
          </BackButton>
          <Button
            onClick={onCreateSurvey}
            size={"sm"}
            disabled={disabledCreateButton}
          >
            Cria questionario <Check className="ml-1 h-5 w-5" />
          </Button>
        </div>

        {survey.questions.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            Adicione uma pergunta para começar.
          </p>
        )}
        <div className="w-full max-w-4xl flex gap-4 items-start">
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="min-h-[500px]  h-[calc(100vh-250px)]  overflow-y-auto flex-1 flex flex-col gap-4 border p-4 rounded-lg bg-card shadow-md">
              <div className="flex items-center justify-between mb-4">
                {" "}
                <h4 className="text-card-foreground text-xl">Perguntas</h4>
                <Button onClick={handleOpenToAdd} size={"sm"}>
                  Adicionar <Plus className="ml-1 h-5 w-5" />
                </Button>
              </div>
              {Object.entries(groupedQuestions).map(
                ([pageIndex, questionsInPage]) => (
                  <div
                    key={`page-${pageIndex}`}
                    className="p-2 border rounded-lg bg-background"
                  >
                    <h3 className="font-bold mb-2 text-center text-sm text-muted-foreground">
                      Página {pageIndex}
                    </h3>

                    <SortableContext
                      items={questionsInPage.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                      id={`page-${pageIndex}`}
                    >
                      <div className="flex flex-col gap-2">
                        {questionsInPage.map((q) => (
                          <SortableQuestionItem
                            key={q.id}
                            question={q}
                            onDelete={deleteQuestion}
                            onEdit={handleOpenToEdit}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </div>
                )
              )}
            </div>
          </DndContext>
          {survey?.questions && (
            <QuestionsFormPreview questions={survey?.questions} />
          )}{" "}
        </div>
      </div>
      <ServeyModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onAddQuestion={addNewQuestion}
        onUpdateQuestion={updateQuestion}
        existingQuestions={survey.questions}
        questionToEdit={questionToEdit}
      />
    </Form>
  );
};
