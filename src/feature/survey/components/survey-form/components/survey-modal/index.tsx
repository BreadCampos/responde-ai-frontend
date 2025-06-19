import { SelectInput } from "@/shared/components/form/select-input";
import { TextInput } from "@/shared/components/form/text-input";
import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { QuestionPreview } from "./components/question-preview";
import { ConditionalValues } from "./components/conditional-values";
import { ValidationRules } from "./components/validation-rules";
import type {
  SurveyQuestion,
  QuestionValidators,
  SurveyQuestionInputType,
} from "@/feature/survey/model/survey.model";
import {
  ControlledOptions,
  typesWithOptions,
} from "./components/controlled-options";
import { SelectOption } from "@/shared/types/select-options.type";
import { RattingType } from "./components/ratting-type";

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
  mask?: string;
  selectOptions: SelectOption[];
  enableConditional: boolean;
  conditionalFieldId?: string;
  conditionalValue?: string;
  conditionalOperator?:
    | "equals"
    | "not_equals"
    | "greater_than"
    | "less_than"
    | "contains"
    | "is_one_of";
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
}
export const ServeyModal = ({
  onAddQuestion,
  onUpdateQuestion,
  isOpen,
  onClose,
  questionToEdit,
  existingQuestions,
}: Props) => {
  const methods = useForm<IForm>({
    defaultValues: {
      pageIndex: 1,
    },
  });
  const { handleSubmit, reset, watch } = methods;

  const handleInternalClose = () => {
    onClose();
    reset();
  };

  const formValues = watch();

  const onSubmit = (data: IForm) => {
    const needsOptions = typesWithOptions.includes(formValues?.type);
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
      mask: data.mask ? data.mask.split(",").map((m) => m.trim()) : null,
      orderIndex: questionToEdit
        ? questionToEdit.orderIndex
        : questionByPage(data.pageIndex).length + 1,

      validations: data.validations
        .filter((v) => v.type)
        .map((v) => v as QuestionValidators),
    };

    if (
      data.enableConditional &&
      data.conditionalFieldId &&
      data.conditionalOperator
    ) {
      if (data.conditionalOperator === "is_one_of" && data.conditionalValues) {
        transformedQuestionData.conditional = {
          fieldId: data.conditionalFieldId,
          operator: "is_one_of",
          value: data.conditionalValues.map((item) => item.text),
        };
      } else if (data.conditionalValue != null) {
        transformedQuestionData.conditional = {
          fieldId: data.conditionalFieldId,
          operator: data.conditionalOperator,
          value: data.conditionalValue,
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

  const maxPossibilitPage = useMemo(() => {
    const pages = existingQuestions.map((question) => question.pageIndex);

    return Math.max(...pages) + 1;
  }, [existingQuestions]);

  const typeOptions: SelectOption[] = [
    { value: "text", label: "Texto" },
    { value: "number", label: "Número" },
    { value: "date", label: "Data" },
    { value: "select", label: "Seleção" },
    { value: "checkbox", label: "Checkbox" },
    { value: "radio", label: "Radio" },
    { value: "textarea", label: "Textarea" },
    { value: "rating", label: "Avaliação" },
    { value: "checkbox_group", label: "Grupo de Checkboxes" },
    { value: "select_multiple", label: "Seleção Múltipla" },
  ];

  useEffect(() => {
    methods.setValue("validations", []);
  }, [formValues.type, methods]);

  useEffect(() => {
    if (isOpen) {
      if (questionToEdit) {
        const editionValues = {
          ...questionToEdit,
          mask: Array.isArray(questionToEdit.mask)
            ? questionToEdit.mask.join(",")
            : undefined,
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
  }, [isOpen, questionToEdit, reset]);

  return (
    <div>
      <Form {...methods}>
        <Modal
          open={isOpen}
          onClose={handleInternalClose}
          title={questionToEdit ? "Editar Questão" : "Adicionar Questão"}
          description={
            questionToEdit
              ? "Está no modo edição de uma questão já existente"
              : "Adicione uma nova questão ao questionário"
          }
          primaryButton={{
            title: "Salvar",
            onClick: handleSubmit(onSubmit),
          }}
          className=""
        >
          <div className="flex flex-col w-[600px] gap-4 max-w-full">
            <div className="flex-1 space-y-4  overflow-y-auto max-h-[50vh] px-5">
              <h3 className="text-lg font-semibold mb-2 text-accent-foreground">
                Especificação
              </h3>
              <div className="p-4 bg-card rounded-md space-y-4 border">
                <TextInput
                  name={"label"}
                  label={"Titulo da questão"}
                  required
                />
                <SelectInput
                  required
                  name={"type"}
                  label={"Tipo de questão"}
                  options={typeOptions}
                />
                <TextInput name={"placeholder"} label={"Placeholder"} />
                <TextInput name={"hint"} label={"Dica"} />
                <TextInput
                  name={"pageIndex"}
                  label={"Número da Página"}
                  type="number"
                  min={1}
                  max={maxPossibilitPage}
                  required
                />
                {formValues?.type === "text" && (
                  <TextInput
                    name="mask"
                    label="Máscara de Input (Opcional)"
                    placeholder="exp: (00) 00000-0000"
                    helperText="Use '0' para números, 'a' para letras e '*' para qualquer caractere. Para múltiplas máscaras, separe com vírgula."
                  />
                )}
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
