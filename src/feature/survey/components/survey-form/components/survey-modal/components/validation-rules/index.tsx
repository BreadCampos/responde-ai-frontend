import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/shared/components/button";
import { SelectInput } from "@/shared/components/form/select-input";
import { TextInput } from "@/shared/components/form/text-input";
import { XIcon } from "lucide-react";
import {
  validationMap,
  type QuestionValidatorsType,
  type SurveyQuestionInputType,
} from "@/feature/survey/model/survey.model";
import { useMemo } from "react";
import { SelectOption } from "@/shared/types/select-options.type";

interface ValidationRuleRowProps {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  validationOptions: SelectOption[];
  remove: (index: number) => void;
  questionType: SurveyQuestionInputType; // NOVO: Prop para receber o tipo da pergunta
}

const ValidationRuleRow = ({
  index,
  control,
  validationOptions,
  remove,
  questionType,
}: ValidationRuleRowProps) => {
  const selectedType = useWatch({
    control,
    name: `validations.${index}.type`,
  }) as QuestionValidatorsType;

  const valueInputType = useMemo(() => {
    const rulesThatNeedValue = [
      "min",
      "max",
      "min_length",
      "max_length",
      "custom",
    ];
    if (!rulesThatNeedValue.includes(selectedType)) {
      return null;
    }

    // Se a pergunta principal for do tipo 'date' e a regra for 'min' ou 'max'...
    if (questionType === "date" && ["min", "max"].includes(selectedType)) {
      // ... o input deve ser do tipo 'date'.
      return "date";
    }

    // Se a regra for sobre tamanho/valor numérico...
    if (["min", "max", "min_length", "max_length"].includes(selectedType)) {
      // ... o input deve ser do tipo 'number'.
      return "number";
    }

    // Se a regra for 'custom' (regex)...
    if (selectedType === "custom") {
      // ... o input deve ser do tipo 'text'.
      return "text";
    }

    // Caso padrão, não mostra input.
    return null;
  }, [questionType, selectedType]);

  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg">
      <div className="flex flex-col items-center gap-2 w-full">
        <SelectInput
          name={`validations.${index}.type`}
          options={validationOptions}
          placeholder="Selecione uma regra"
          containerClassName="w-full flex-1"
        />
        {valueInputType === "date" && (
          <TextInput
            name={`validations.${index}.options.value`}
            type="date"
            placeholder="Selecione a data"
          />
        )}
        {valueInputType === "number" && (
          <TextInput
            name={`validations.${index}.options.value`}
            type="number"
            placeholder="Valor"
          />
        )}
        {valueInputType === "text" && (
          <TextInput
            name={`validations.${index}.options.value`}
            type="text"
            placeholder="Regex"
          />
        )}
        <TextInput
          name={`validations.${index}.errorMessage`}
          placeholder="Mensagem de erro (opcional)"
          containerClassName="flex-1"
        />
      </div>
      <Button
        variant="destructive"
        size="icon"
        type="button"
        onClick={() => remove(index)}
      >
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const ValidationRules = () => {
  const { control } = useFormContext();
  const questionType = useWatch({
    control,
    name: "type",
  }) as SurveyQuestionInputType;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "validations",
  });

  const availableValidations = questionType
    ? validationMap[questionType] || []
    : [];

  const validationOptions: SelectOption[] = availableValidations.map((v) => ({
    value: v as string,
    label: v.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase()),
    disabled: fields.some((field) => (field as { type?: string }).type === v),
  }));

  const maxValidations = validationOptions.length === fields?.length;
  return (
    <div className="p-4 bg-card rounded-lg space-y-4 border">
      <h4 className="font-medium text-card-foreground">Regras de Validação</h4>
      {fields.map((field, index) => (
        <ValidationRuleRow
          key={field.id}
          index={index}
          control={control}
          validationOptions={validationOptions}
          remove={remove}
          questionType={questionType}
        />
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          append({ type: "", options: { value: "" }, errorMessage: "" })
        }
        disabled={!questionType || maxValidations}
      >
        Adicionar Validação +
      </Button>
    </div>
  );
};
