/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  TextInput,
  SelectInput,
  CheckboxInput,
  RadioGroupInput,
  TextareaInput,
  RatingStarsInput,
  SlideInput,
  SelectMultipleInput,
} from "@/shared/components/form";
import { CheckboxGroupInput } from "@/shared/components/form/checkbox-group-input";
import { MaskedInput } from "@/shared/components/form/mask-input";
import { getValidationRules } from "../../helper/get-validation-rules";
import type { SurveyQuestion } from "@/feature/survey/model/survey.model";
import { NpsInput } from "@/shared/components/form/nps-input";

interface Props {
  question: SurveyQuestion;
}

export const InputPreview = ({ question }: Props) => {
  const { rules, inputProps } = getValidationRules(question.validations);

  console.log(inputProps);
  const renderInput = (name: any, rules: any) => {
    switch (question.type) {
      case "text":
        if (question.mask) {
          return (
            <MaskedInput
              name={name}
              placeholder={question?.placeholder}
              label={question?.label}
              rules={rules}
              mask={question.mask}
              {...inputProps}
            />
          );
        }
        return (
          <TextInput
            name={name}
            placeholder={question?.placeholder}
            label={question?.label}
            rules={rules}
            type={question.type}
            {...inputProps}
          />
        );
      case "textarea":
        return (
          <TextareaInput name={name} label={question?.label} rules={rules} />
        );
      case "number":
        return (
          <TextInput
            name={name}
            placeholder={question?.placeholder}
            type="number"
            label={question?.label}
            rules={rules}
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
            {...inputProps}
          />
        );
      case "checkbox":
        return (
          <CheckboxInput name={name} rules={rules} label={question?.label} />
        );
      case "radio":
        return (
          <RadioGroupInput
            options={question?.selectOptions || []}
            name={name}
            label={question?.label}
            rules={rules}
            className="flex flex-col"
          />
        );
      case "rating":
        if (question.ratingOptions?.style === "slider") {
          return <SlideInput name={name} question={question} rules={rules} />;
        }
        if (question.ratingOptions?.style === "nps") {
          return <NpsInput name={name} question={question} rules={rules} />;
        }
        return (
          <RatingStarsInput
            name={name}
            label={question?.label}
            rules={rules}
            min={question.ratingOptions?.min}
            max={question.ratingOptions?.max}
          />
        );
      case "checkbox_group":
        return (
          <CheckboxGroupInput
            name={question.id}
            label={question.label}
            options={question.selectOptions || []}
            rules={rules}
          />
        );
      case "select_multiple":
        return (
          <SelectMultipleInput
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

  console.log("rules", rules);
  return (
    <div>
      {renderInput(question.id, rules)}
      <p className="text-gray-600 text-sm m-2">{question?.hint}</p>
    </div>
  );
};
