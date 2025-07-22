import {
  validationMap,
  type QuestionValidatorsType,
  type SurveyQuestionInputType,
} from "@/feature/survey/model/survey.model";
import { Button } from "@/shared/components/button";
import { SelectInput } from "@/shared/components/form/select-input";
import { TextInput } from "@/shared/components/form/text-input";
import { SelectOption } from "@/shared/types/select-options.type";
import { XIcon } from "lucide-react";
import { useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation("surveys");
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
          placeholder={t("surveyModal.validations.fields.type.placeholder")}
          containerClassName="w-full flex-1"
        />
        {valueInputType === "date" && (
          <TextInput
            name={`validations.${index}.options.value`}
            type="date"
            placeholder={t(
              "surveyModal.validations.fields.value.datePlaceholder"
            )}
          />
        )}
        {valueInputType === "number" && (
          <TextInput
            name={`validations.${index}.options.value`}
            type="number"
            placeholder={t(
              "surveyModal.validations.fields.value.numberPlaceholder"
            )}
          />
        )}
        {valueInputType === "text" && (
          <TextInput
            name={`validations.${index}.options.value`}
            type="text"
            placeholder={t(
              "surveyModal.validations.fields.value.textPlaceholder"
            )}
          />
        )}
        <TextInput
          name={`validations.${index}.errorMessage`}
          placeholder={t(
            "surveyModal.validations.fields.errorMessage.placeholder"
          )}
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
  const { t } = useTranslation("surveys");

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

  const validationOptions: SelectOption[] = availableValidations.map((v) => {
    return {
      value: v,
      label: t(`surveyModal.validations.labels.${v}`),
      disabled: fields.some((field) => (field as { type?: string }).type === v),
    };
  });

  const maxValidations = validationOptions.length === fields?.length;
  return (
    <div className="p-4 bg-card rounded-lg space-y-4 border">
      <h4 className="font-medium text-card-foreground">
        {t("surveyModal.validations.title")}
      </h4>
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
        {t("surveyModal.validations.buttons.add")}
      </Button>
    </div>
  );
};
