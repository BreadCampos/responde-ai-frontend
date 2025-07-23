import type {
  QuestionConditionOptions,
  QuestionValidators,
  SurveyQuestion,
  SurveyQuestionInputType,
} from "@/feature/survey/model/survey.model";
import { SelectInput } from "@/shared/components/form/select-input";
import { TextInput } from "@/shared/components/form/text-input";
import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useTranslation } from "@/shared/hooks/use-translation";
import { SelectOption } from "@/shared/types/select-options.type";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ConditionalValues } from "./components/conditional-values";
import {
  ControlledOptions,
  typesWithOptions,
} from "./components/controlled-options";
import { QuestionPreview } from "./components/question-preview";
import { RattingType } from "./components/ratting-type";
import { ValidationRules } from "./components/validation-rules";

interface Props {
  onAddQuestion: (question: SurveyQuestion) => void;
  onUpdateQuestion: (question: SurveyQuestion) => void;
  isOpen: boolean;
  onClose: () => void;
  questionToEdit: SurveyQuestion | null;
  existingQuestions: SurveyQuestion[];
}

export interface IForm {
  label: string;
  placeholder?: string;
  hint?: string;
  type: SurveyQuestionInputType;
  inputMask?: string;
  selectOptions: SelectOption[];
  enableConditional: boolean;

  conditionalValues?: {
    text: string;
  }[];
  validations: QuestionValidators[];
  pageIndex: number;
  ratingOptions?: {
    min: number;
    max: number;
    minLabel?: string;
    maxLabel?: string;
    style: "stars" | "slider" | "nps";
  };
  conditional?: QuestionConditionOptions | undefined;
}
export const ServeyModal = ({
  onAddQuestion,
  onUpdateQuestion,
  isOpen,
  onClose,
  questionToEdit,
  existingQuestions,
}: Props) => {
  const { t } = useTranslation("surveys");
  const methods = useForm<IForm>({
    defaultValues: {
      pageIndex: 1,
    },
  });
  const { handleSubmit, reset, watch, setValue } = methods;

  const handleInternalClose = () => {
    onClose();
    reset();
  };

  const watchedType = watch("type");

  const onSubmit = (data: IForm) => {
    const needsOptions = typesWithOptions.includes(data?.type);
    if (needsOptions && data.selectOptions.length === 0) {
      methods.setError("selectOptions", {
        type: "manual",
        message: "Por favor, adicione pelo menos uma opção.",
      });
      return;
    }

    const questionByPage = (page: number) => {
      return existingQuestions.filter(
        (q) => q.pageIndex === page && q.id !== questionToEdit?.id
      );
    };

    const transformedQuestionData: SurveyQuestion = {
      id: crypto.randomUUID(),
      label: data.label,
      type: data.type,
      selectOptions: needsOptions ? data.selectOptions : undefined,
      pageIndex: Number(data.pageIndex) || 1,
      ratingOptions: data.ratingOptions,
      placeholder: data.placeholder,
      hint: data.hint,
      mask: data.inputMask
        ? data.inputMask.split(",").map((m) => m.trim())
        : null,
      orderIndex: questionToEdit
        ? questionToEdit.orderIndex
        : questionByPage(data.pageIndex).length + 1,

      validations: data.validations
        .filter((v) => v.type)
        .map((v) => v as QuestionValidators),
    };

    if (
      data.enableConditional &&
      data?.conditional?.fieldId &&
      data?.conditional.operator &&
      data.conditionalValues
    ) {
      if (
        data?.conditional.operator === "is_one_of" &&
        data.conditionalValues
      ) {
        transformedQuestionData.conditional = {
          fieldId: data?.conditional.fieldId,
          operator: "is_one_of",
          value: data.conditionalValues.map((item) => item.text),
        };
      } else if (data?.conditional.value != null) {
        transformedQuestionData.conditional = {
          fieldId: data?.conditional.fieldId,
          operator: data?.conditional.operator,
          value: data?.conditional.value,
        };
      }
    }

    if (questionToEdit) {
      onUpdateQuestion({ ...transformedQuestionData, id: questionToEdit.id });
    } else {
      onAddQuestion({ ...transformedQuestionData, id: crypto.randomUUID() });
    }

    onClose();
  };

  const handleTypeChange = useCallback(() => {
    setValue("validations", []);
    setValue("conditional", undefined);
    setValue("enableConditional", false);
  }, [setValue]);
  const maxPossibilitPage = useMemo(() => {
    const pages = existingQuestions.map((question) => question.pageIndex);

    return Math.max(...pages) + 1;
  }, [existingQuestions]);

  const questionId = questionToEdit?.id;

  useEffect(() => {
    if (isOpen) {
      if (questionToEdit) {
        const value = questionToEdit.conditional?.value;
        const conditionalValues = Array.isArray(value)
          ? value.map((v) => ({ text: v }))
          : typeof value === "string"
          ? [{ text: value }]
          : undefined;
        const editionValues = {
          ...questionToEdit,
          inputMask: Array.isArray(questionToEdit.mask)
            ? questionToEdit.mask.join(",")
            : undefined,
          enableConditional: !!questionToEdit.conditional,
          conditionalValues,
        };
        reset(editionValues);
      } else {
        reset({
          pageIndex: 1,
          validations: [],
          selectOptions: [],
        });
      }
    }
    // TODO: fix, added just for build
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, questionId, reset]);

  const typeOptions: SelectOption[] = useMemo(
    () => [
      { value: "text", label: t("questionTypes.text") },
      { value: "number", label: t("questionTypes.number") },
      { value: "date", label: t("questionTypes.date") },
      { value: "select", label: t("questionTypes.select") },
      { value: "checkbox", label: t("questionTypes.checkbox") },
      { value: "radio", label: t("questionTypes.radio") },
      { value: "textarea", label: t("questionTypes.textarea") },
      { value: "rating", label: t("questionTypes.rating") },
      { value: "checkbox_group", label: t("questionTypes.checkbox_group") },
      { value: "select_multiple", label: t("questionTypes.select_multiple") },
    ],
    [t]
  );

  return (
    <div>
      <Form {...methods}>
        <Modal
          open={isOpen}
          onClose={handleInternalClose}
          title={t(
            questionToEdit ? "surveyModal.title.edit" : "surveyModal.title.add"
          )}
          description={t(
            questionToEdit
              ? "surveyModal.description.edit"
              : "surveyModal.description.add"
          )}
          primaryButton={{
            title: t("surveyModal.buttons.save"),
            onClick: handleSubmit(onSubmit),
          }}
          className=""
        >
          <div className="flex flex-col w-[600px] gap-4 max-w-full">
            <div className="flex-1 space-y-4  overflow-y-auto max-h-[50vh] p-1 md:px-5 ">
              <h3 className="text-lg font-semibold mb-2 text-accent-foreground">
                {t("surveyModal.form.title")}
              </h3>
              <div className="p-4 bg-card rounded-lg space-y-4 border">
                <TextInput
                  name={"label"}
                  label={t("surveyModal.form.fields.label.label")}
                  required
                />
                <SelectInput
                  required
                  name={"type"}
                  label={t("surveyModal.form.fields.type.label")}
                  options={typeOptions}
                  onChange={handleTypeChange}
                />
                <TextInput
                  name={"placeholder"}
                  label={t("surveyModal.form.fields.placeholder.label")}
                />
                <TextInput
                  name={"hint"}
                  label={t("surveyModal.form.fields.hint.label")}
                />
                <TextInput
                  name={"pageIndex"}
                  label={t("surveyModal.form.fields.pageIndex.label")}
                  type="number"
                  min={1}
                  max={maxPossibilitPage}
                  required
                />
                <TextInput
                  disabled={watchedType !== "text"}
                  name="inputMask"
                  label={t("surveyModal.form.fields.inputMask.label")}
                  placeholder={t(
                    "surveyModal.form.fields.inputMask.placeholder"
                  )}
                  helperText={t("surveyModal.form.fields.inputMask.helperText")}
                />
              </div>
              <RattingType />
              <ControlledOptions />
              <ConditionalValues existingQuestions={existingQuestions} />
              <ValidationRules />
            </div>

            <QuestionPreview />
          </div>
        </Modal>
      </Form>
    </div>
  );
};
