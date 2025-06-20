import { InputPreview } from "../../../input-preview";
import { useFormContext } from "react-hook-form";
import { IForm } from "../..";
import { SurveyQuestion } from "@/feature/survey/model/survey.model";
export const QuestionPreview = () => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<IForm>();
  const formValues = watch();

  console.log("QuestionPreview formValues", errors);

  if (!formValues?.type) return null;

  const questionPreview: SurveyQuestion = {
    id: crypto.randomUUID(),

    orderIndex: 0,
    ...formValues,
    mask:
      formValues?.mask === undefined
        ? undefined
        : Array.isArray(formValues.mask)
        ? formValues.mask
        : formValues.mask === null
        ? null
        : [formValues.mask],
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
