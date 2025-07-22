/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SurveyQuestion } from "@/feature/survey/model/survey.model";
import {
  CheckboxInput,
  RadioGroupInput,
  RatingStarsInput,
  SelectInput,
  SelectMultipleInput,
  SlideInput,
  TextareaInput,
  TextInput,
} from "@/shared/components/form";
import { CheckboxGroupInput } from "@/shared/components/form/checkbox-group-input";
import { MaskedInput } from "@/shared/components/form/mask-input";
import { NpsInput } from "@/shared/components/form/nps-input";
import { memo } from "react";
import { useValidationRules } from "../../helper/get-validation-rules";

interface Props {
  question: SurveyQuestion;
  disabled?: boolean;
  answer?: string[] | number | string;
}

export const InputPreview = memo(({ question, disabled, answer }: Props) => {
  const { rules, inputProps } = useValidationRules(question.validations);

  const renderInput = (name: any, rules: any) => {
    switch (question.type) {
      case "text":
        if (question.mask) {
          return (
            <MaskedInput
              disabled={disabled}
              name={name}
              placeholder={question?.placeholder}
              label={question?.label}
              rules={rules}
              mask={question.mask}
              {...inputProps}
              value={answer}
            />
          );
        }
        return (
          <TextInput
            name={name}
            disabled={disabled}
            placeholder={question?.placeholder}
            label={question?.label}
            rules={rules}
            type={question.type}
            {...inputProps}
            value={answer}
          />
        );
      case "textarea":
        return (
          <TextareaInput
            name={name}
            label={question?.label}
            rules={rules}
            disabled={disabled}
          />
        );
      case "number":
        return (
          <TextInput
            name={name}
            placeholder={question?.placeholder}
            type="number"
            label={question?.label}
            rules={rules}
            disabled={disabled}
            {...inputProps}
          />
        );
      case "select":
        return (
          <SelectInput
            name={name}
            placeholder={question?.placeholder}
            label={question?.label}
            options={question.selectOptions || []}
            rules={rules}
            disabled={disabled}
          />
        );
      case "date":
        return (
          <TextInput
            name={name}
            placeholder={question?.placeholder}
            label={question?.label}
            rules={rules}
            type="date"
            disabled={disabled}
            {...inputProps}
          />
        );
      case "checkbox":
        return (
          <CheckboxInput
            name={name}
            rules={rules}
            label={question?.label}
            disabled={disabled}
          />
        );
      case "radio":
        return (
          <RadioGroupInput
            options={question?.selectOptions || []}
            name={name}
            label={question?.label}
            rules={rules}
            disabled={disabled}
            className="flex flex-col"
          />
        );
      case "rating":
        if (question.ratingOptions?.style === "slider") {
          return (
            <SlideInput
              name={name}
              question={question}
              rules={rules}
              disabled={disabled}
            />
          );
        }
        if (question.ratingOptions?.style === "nps") {
          return (
            <NpsInput
              name={name}
              question={question}
              rules={rules}
              disabled={disabled}
            />
          );
        }
        return (
          <RatingStarsInput
            name={name}
            disabled={disabled}
            label={question?.label}
            rules={rules}
            min={question.ratingOptions?.min}
            max={question.ratingOptions?.max}
          />
        );
      case "checkbox_group":
        return (
          <CheckboxGroupInput
            disabled={disabled}
            name={question.id}
            label={question.label}
            options={question.selectOptions || []}
            rules={rules}
          />
        );
      case "select_multiple":
        return (
          <SelectMultipleInput
            disabled={disabled}
            name={question.id}
            label={question.label}
            options={question.selectOptions || []}
            rules={rules}
            placeholder="Selecione uma ou mais opções"
            {...inputProps}
          />
        );
      default:
        break;
    }
  };

  return (
    <div>
      {renderInput(question.id, rules)}
      <p className="text-gray-400 text-sm m-1">{question?.hint}</p>
    </div>
  );
});

InputPreview.displayName = "InputPreview";
