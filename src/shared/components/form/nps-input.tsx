// src/shared/components/form/nps-input.tsx
import { useController, useFormContext } from "react-hook-form";
import { Label } from "@/shared/components/ui/label";
import type { SurveyQuestion } from "@/feature/survey/model/survey.model";
import cn from "clsx"; // ou sua biblioteca de classes preferida como 'clsx'

interface NpsInputProps {
  name: string;
  question: SurveyQuestion;
}

export const NpsInput = ({ name, question }: NpsInputProps) => {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    rules: { required: "Este campo é obrigatório" },
  });

  const scores = Array.from({ length: 11 }, (_, i) => i);

  const getColorClass = (score: number) => {
    if (score <= 6) return "bg-red-500 hover:bg-red-600";
    if (score <= 8) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-green-500 hover:bg-green-600";
  };

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name}>{question.label}</Label>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        {scores.map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => field.onChange(score)}
            className={cn(
              "w-10 h-10 rounded-md flex items-center justify-center text-white font-bold transition-transform duration-200",
              field.value === score
                ? "ring-2 ring-offset-2 ring-primary scale-110"
                : "scale-100",
              getColorClass(score)
            )}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>Pouco provável</span>
        <span>Muito provável</span>
      </div>
    </div>
  );
};
