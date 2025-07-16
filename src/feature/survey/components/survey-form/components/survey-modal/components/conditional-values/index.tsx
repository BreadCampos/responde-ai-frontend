import { Button } from "@/shared/components/button";
import {
  CheckboxInput,
  SelectInput,
  TextInput,
} from "@/shared/components/form";
import { Label } from "@/shared/components/ui/label";

import {
  operatorMap,
  type QuestionConditionOperators,
  type SurveyQuestion,
} from "@/feature/survey/model/survey.model";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { SelectOption } from "@/shared/types/select-options.type";
import { XIcon } from "lucide-react";
import { useMemo } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { IForm } from "../../index";
import { typesWithOptions } from "../controlled-options";
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
  const { t } = useTranslation("surveys");

  const allOperationOptions: SelectOption[] = useMemo(
    () => [
      {
        value: "equals",
        label: t("surveyModal.conditionals.operators.equals"),
      },
      {
        value: "not_equals",
        label: t("surveyModal.conditionals.operators.not_equals"),
      },
      {
        value: "greater_than",
        label: t("surveyModal.conditionals.operators.greater_than"),
      },
      {
        value: "greater_than_equal",
        label: t("surveyModal.conditionals.operators.greater_than_equal"),
      },
      {
        value: "less_than",
        label: t("surveyModal.conditionals.operators.less_than"),
      },
      {
        value: "less_than_equal",
        label: t("surveyModal.conditionals.operators.less_than_equal"),
      },
      {
        value: "contains",
        label: t("surveyModal.conditionals.operators.contains"),
      },
      {
        value: "is_one_of",
        label: t("surveyModal.conditionals.operators.is_one_of"),
      },
    ],
    [t]
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
        label={t("surveyModal.conditionals.enable.label")}
      />

      {enableConditional && (
        <div className="p-4 bg-card rounded-lg space-y-4  flex flex-col gap-4 border justify-center ">
          <SelectInput
            required={enableConditional}
            name="conditional.fieldId"
            options={questionOptionsForSelect}
            label={t("surveyModal.conditionals.fields.fieldId.label")}
            placeholder={t(
              "surveyModal.conditionals.fields.fieldId.placeholder"
            )}
            onChange={() => {
              setValue("conditional.value", "");
              setValue("conditional.operator", null);
            }}
            triggerClassName="max-w-[450px]"
          />
          <SelectInput
            name="conditional.operator"
            required={enableConditional}
            label={t("surveyModal.conditionals.fields.operator.label")}
            placeholder={t(
              "surveyModal.conditionals.fields.operator.placeholder"
            )}
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
                      placeholder={t(
                        "surveyModal.conditionals.multiValue.optionPlaceholder",
                        { index: index + 1 }
                      )}
                      containerClassName="flex-grow max-w-[450px]"
                    />
                  ) : (
                    <TextInput
                      required
                      name={`conditionalValues.${index}.text`}
                      placeholder={t(
                        "surveyModal.conditionals.multiValue.valuePlaceholder",
                        { index: index + 1 }
                      )}
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
                {t("surveyModal.conditionals.buttons.addValue")}{" "}
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
                  placeholder={t(
                    "surveyModal.conditionals.singleValue.selectPlaceholder"
                  )}
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
                      placeholder={t(
                        "surveyModal.conditionals.singleValue.textPlaceholder"
                      )}
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
                      placeholder={t(
                        "surveyModal.conditionals.singleValue.textPlaceholder"
                      )}
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
