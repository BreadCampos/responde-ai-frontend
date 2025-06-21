import { Button } from "@/shared/components/button";
import {
  CheckboxInput,
  SelectInput,
  TextInput,
} from "@/shared/components/form";
import { Label } from "@/shared/components/ui/label";

import type { IForm } from "../../index";
import { XIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useEffect, useMemo } from "react";
import {
  operatorMap,
  type QuestionConditionOperators,
  type SurveyQuestion,
} from "@/feature/survey/model/survey.model";
import { SelectOption } from "@/shared/types/select-options.type";
// import { typesWithOptions } from "../controlled-options";
interface Props {
  existingQuestions: SurveyQuestion[];
}
export const ConditionalValues = ({ existingQuestions }: Props) => {
  const { watch, setValue, control } = useFormContext<IForm>();

  const formValues = watch();

  const questionOptionsForSelect: SelectOption[] = existingQuestions?.map(
    (q) => ({
      label: q.label,
      value: q.id,
    })
  );

  const allOperationOptions: SelectOption[] = [
    { value: "equals", label: "Igual a" },
    { value: "not_equals", label: "Diferente de" },
    { value: "greater_than", label: "Maior que" },
    { value: "greater_than_equal", label: "Maior ou igual a" },
    { value: "less_than", label: "Menor que" },
    { value: "less_than_equal", label: "Menor ou igual a" },
    { value: "contains", label: "Contém" },
    { value: "is_one_of", label: "É um de (OU)" },
  ];

  const dependentFieldType = existingQuestions.find(
    (q) => q.id === formValues.conditional?.fieldId
  )?.type;

  const {
    fields: valueFields,
    append: appendValue,
    remove: removeValue,
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
    console.log({});
  }, [formValues.conditional?.fieldId, setValue]);

  // const needsOptions = typesWithOptions.includes(dependentFieldType || "");

  // const conditionalOptions = useMemo(() => {
  //   const options = existingQuestions.find(
  //     (q) => q.id === formValues.conditional?.fieldId
  //   )?.selectOptions;

  //   console.log({
  //     asd:
  //       options?.map((item) => ({
  //         ...item,
  //         disabled: formValues?.conditional?.value?.some(
  //           (v) => v?.text === item.value
  //         ),
  //       })) || [],
  //   });
  //   if (Array.isArray(formValues?.conditional?.value)) {
  //     return (
  //       options?.map((item) => ({
  //         ...item,
  //         disabled: formValues?.conditional?.value?.some(
  //           (v) => v?.text === item.value
  //         ),
  //       })) || []
  //     );
  //   }
  //   return options;
  // }, [existingQuestions, formValues.conditional?.fieldId]);

  if (existingQuestions?.length < 1) return null;

  return (
    <div className="p-4 bg-card rounded-lg space-y-4 border">
      <CheckboxInput
        name="enableConditional"
        label="Adicionar lógica condicional?"
      />

      {formValues?.enableConditional && (
        <div className="p-4 bg-card rounded-lg space-y-4  flex flex-col gap-4 border justify-center ">
          <SelectInput
            required={formValues?.enableConditional}
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
            required={formValues?.enableConditional}
            label="...a condição for..."
            placeholder="Selecione uma condição"
            options={filteredOperationOptions}
            triggerClassName="max-w-[450px]"
            disabled={!dependentFieldType}
          />

          {formValues?.conditional?.operator === "is_one_of" ? (
            <div className="space-y-2">
              <Label>...um dos seguintes valores:</Label>
              {valueFields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <TextInput
                    required={formValues?.enableConditional}
                    name={`conditional.value.${index}.text`}
                    placeholder={`Valor ${index + 1}`}
                    containerClassName="flex-grow max-w-[450px]"
                  />

                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    onClick={() => removeValue(index)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendValue({ text: "" })}
              >
                Adicionar Valor
              </Button>
            </div>
          ) : (
            <div className="conditional-value-input">
              <Label>...o valor:</Label>

              {dependentFieldType === "date" && (
                <TextInput
                  required={formValues?.enableConditional}
                  name="conditional.value"
                  type="date"
                  containerClassName="flex-grow max-w-[450px] mt-2"
                />
              )}
              {["text", "select", "radio", "textarea", undefined].includes(
                dependentFieldType
              ) && (
                <TextInput
                  required={formValues?.enableConditional}
                  name="conditional.value"
                  placeholder="Coloque o valor"
                  containerClassName="flex-grow max-w-[450px] mt-2"
                />
              )}
              {dependentFieldType === "number" && (
                <TextInput
                  containerClassName="flex-grow max-w-[450px] mt-2"
                  required={formValues?.enableConditional}
                  name="conditional.value"
                  type="number"
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
