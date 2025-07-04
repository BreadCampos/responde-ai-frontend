import { InputPreview } from "../../../input-preview";
import { useFormContext } from "react-hook-form";
import { IForm } from "../..";
import { SurveyQuestion } from "@/feature/survey/model/survey.model";
import { useDebounce } from "@/shared/hooks/use-debounce";
export const QuestionPreview = () => {
  const { watch } = useFormContext<IForm>();
  const formValues = watch();
  const debouncedValues = useDebounce(formValues, 500);

  if (!debouncedValues?.type) return null;

  const questionPreview: SurveyQuestion = {
    id: "static-preview-id",
    orderIndex: 0,
    ...debouncedValues,
    mask:
      debouncedValues?.inputMask === undefined
        ? undefined
        : Array.isArray(debouncedValues.inputMask)
        ? debouncedValues.inputMask
        : debouncedValues.inputMask === null
        ? null
        : [debouncedValues.inputMask],
    validations: [],
  };

  return (
    <div className="p-4 mx-5 bg-card rounded-lg space-y-4 border max-h-[180px]">
      <h3 className="text-lg font-semibold mb-2 text-card-foreground">
        Pré vizualização
      </h3>
      <InputPreview question={questionPreview} />
    </div>
  );
};
