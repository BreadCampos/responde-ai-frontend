// src/shared/components/form/nps-input.tsx
import {
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { Label } from "@/shared/components/ui/label";
import type { SurveyQuestion } from "@/feature/survey/model/survey.model";
import cn from "clsx"; // ou sua biblioteca de classes preferida como 'clsx'

interface NpsInputProps {
  name: string;
  question: SurveyQuestion;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  disabled?: boolean;
}

export const NpsInput = ({
  name,
  question,
  rules,
  disabled = false,
}: NpsInputProps) => {
  const { control, clearErrors } = useFormContext();
  const { field, fieldState } = useController({
    name,
    control,
    rules,
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
      <div
        className={cn(
          "flex items-center py-2",
          "gap-2 flex-wrap justify-center",
          "sm:w-full sm:justify-between sm:gap-0 sm:overflow-x-visible"
        )}
      >
        {scores.map((score) => (
          <button
            key={score}
            type="button"
            disabled={disabled}
            onClick={() => {
              field.onChange(score);
              if (fieldState.error) {
                clearErrors(name);
              }
            }}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold transition-transform duration-200 flex-shrink-0",
              field.value === score
                ? "ring-2 ring-offset-2 ring-primary scale-110"
                : "scale-100",
              getColorClass(score),
              disabled && "opacity-50 cursor-not-allowed pointer-events-none"
            )}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-sm text-muted-foreground mt-1">
        <span>{question?.ratingOptions?.minLabel ?? "Pouco provável"}</span>
        <span>{question?.ratingOptions?.maxLabel ?? "Muito provável"}</span>
      </div>
      {fieldState.error && (
        <span className="text-red-500 text-sm mt-1">
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
};
