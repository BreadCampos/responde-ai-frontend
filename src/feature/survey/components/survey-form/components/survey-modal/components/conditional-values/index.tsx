import { Button } from "@/shared/components/button";
import {
  CheckboxInput,
  SelectInput,
  TextInput,
} from "@/shared/components/form";
import { Label } from "@/shared/components/ui/label";

import type { IForm } from "../../index";
import { XIcon } from "lucide-react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import {
  operatorMap,
  type QuestionConditionOperators,
  type SurveyQuestion,
} from "@/feature/survey/model/survey.model";
import { SelectOption } from "@/shared/types/select-options.type";
import { typesWithOptions } from "../controlled-options";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
// import { typesWithOptions } from "../controlled-options";
interface Props {
  existingQuestions: SurveyQuestion[];
}
export const ConditionalValues = ({ existingQuestions }: Props) => {
  const { watch, setValue, control } = useFormContext<IForm>();

  const [enableConditional, dependentFieldId, operator, conditionalValue] =
    useWatch({
      control,
      name: [
        "enableConditional",
        "conditional.fieldId",
        "conditional.operator",
        "conditionalValues",
      ],
    });
  const formValues = watch();

  const questionOptionsForSelect: SelectOption[] = useMemo(
    () =>
      existingQuestions?.map((q) => ({ label: q.label, value: q.id })) || [],
    [existingQuestions]
  );
  const { handleFormatMinMaxValue } = useFormatValues();

  const allOperationOptions: SelectOption[] = useMemo(
    () => [
      { value: "equals", label: "Igual a" },
      { value: "not_equals", label: "Diferente de" },
      { value: "greater_than", label: "Maior que" },
      { value: "greater_than_equal", label: "Maior ou igual a" },
      { value: "less_than", label: "Menor que" },
      { value: "less_than_equal", label: "Menor ou igual a" },
      { value: "contains", label: "Contém" },
      { value: "is_one_of", label: "É um de (OU)" },
    ],
    []
  );

  const dependentField = useMemo(
    () => existingQuestions.find((q) => q.id === dependentFieldId),
    [existingQuestions, dependentFieldId]
  );
  const dependentFieldType = dependentField?.type;
  const {
    fields: valueFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "conditionalValues",
  });

  const filteredOperationOptions = useMemo(() => {
    if (!dependentFieldType) return [];

    const allowedOperators = operatorMap[dependentFieldType] || [];
    return allOperationOptions.filter((opt) =>
      allowedOperators.includes(opt.value as QuestionConditionOperators)
    );
  }, [allOperationOptions, dependentFieldType]);

  useEffect(() => {
    console.log({
      oi: formValues.conditional,
      OI: formValues.conditionalValues,
    });
  }, [formValues.conditional?.fieldId, setValue]);

  const shouldShowSelect = useMemo(
    () => typesWithOptions.includes(dependentFieldType || ""),
    [dependentFieldType]
  );

  const optionsForMultiSelect = useMemo(() => {
    const availableOptions = dependentField?.selectOptions || [];

    const selectedValues = Array.isArray(conditionalValue)
      ? conditionalValue.map((v) => v.text)
      : [];

    return availableOptions.map((option) => ({
      ...option,

      disabled: selectedValues.includes(String(option.value)),
    }));
  }, [dependentField, conditionalValue]);

  const allOptionsUsed = useMemo(() => {
    if (!shouldShowSelect) return false;
    const totalOptions = dependentField?.selectOptions?.length || 0;
    return valueFields.length >= totalOptions;
  }, [valueFields.length, dependentField, shouldShowSelect]);

  if (existingQuestions?.length < 1) return null;

  return (
    <div className="p-4 bg-card rounded-lg space-y-4 border">
      <CheckboxInput
        name="enableConditional"
        label="Adicionar lógica condicional?"
      />

      {enableConditional && (
        <div className="p-4 bg-card rounded-lg space-y-4  flex flex-col gap-4 border justify-center ">
          <SelectInput
            required={enableConditional}
            name="conditional.fieldId"
            label="Aparecer somente se a pergunta..."
            options={questionOptionsForSelect}
            placeholder="Selecione uma pergunta"
            onChange={() => {
              setValue("conditional.value", "");
              setValue("conditional.operator", null);
            }}
            triggerClassName="max-w-[450px]"
          />
          <SelectInput
            name="conditional.operator"
            required={enableConditional}
            label="...a condição for..."
            placeholder="Selecione uma condição"
            options={filteredOperationOptions}
            triggerClassName="max-w-[450px]"
            onChange={(op) => {
              setValue("conditional.value", op === "is_one_of" ? [] : "");
            }}
            disabled={!dependentFieldType}
          />

          {operator === "is_one_of" ? (
            <div className="space-y-2">
              <Label>...um dos seguintes valores:</Label>
              {valueFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  {shouldShowSelect ? (
                    <SelectInput
                      required
                      name={`conditionalValues.${index}.text`}
                      options={optionsForMultiSelect}
                      placeholder={`Opção ${index + 1}`}
                      containerClassName="flex-grow max-w-[450px]"
                    />
                  ) : (
                    <TextInput
                      required
                      name={`conditionalValues.${index}.text`}
                      placeholder={`Valor ${index + 1}`}
                      containerClassName="flex-grow max-w-[450px]"
                    />
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ text: "" })}
                disabled={allOptionsUsed}
              >
                Adicionar Valor
              </Button>
            </div>
          ) : operator ? (
            <div className="space-y-2">
              <Label>...o valor:</Label>
              {shouldShowSelect ? (
                <SelectInput
                  required
                  name="conditional.value"
                  options={dependentField?.selectOptions || []}
                  placeholder="Selecione uma opção"
                  containerClassName="flex-grow max-w-[450px]"
                />
              ) : (
                <>
                  {dependentFieldType === "date" && (
                    <TextInput
                      required
                      name="conditional.value"
                      type="date"
                      containerClassName="max-w-[450px]"
                    />
                  )}
                  {dependentFieldType === "datetime" && (
                    <TextInput
                      required
                      name="conditional.value"
                      type="datetime-local"
                      containerClassName="max-w-[450px]"
                    />
                  )}
                  {["text", "textarea", , undefined].includes(
                    dependentFieldType
                  ) && (
                    <TextInput
                      required
                      name="conditional.value"
                      placeholder="Coloque o valor"
                      type={dependentFieldType === "number" ? "number" : "text"}
                      containerClassName="max-w-[450px]"
                    />
                  )}
                  {["number", "rating"].includes(dependentFieldType || "") && (
                    <TextInput
                      required
                      name="conditional.value"
                      type="number"
                      max={dependentField?.ratingOptions?.max}
                      min={dependentField?.ratingOptions?.min}
                      onKeyPress={(e) => {
                        handleFormatMinMaxValue(
                          e,
                          formValues?.ratingOptions?.min || 0,
                          dependentField?.ratingOptions?.max
                        );
                      }}
                      placeholder="Coloque o valor"
                      containerClassName="max-w-[450px]"
                    />
                  )}
                </>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
