import { useState } from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { Star } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";

export interface RatingStarsInputProps {
  name: string;
  label?: string;
  description?: string;
  min?: number;
  max?: number;
  required?: boolean;
  disabled?: boolean;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  containerClassName?: string;
}

export const RatingStarsInput = ({
  name,
  label,
  description,
  min = 1,
  max = 5,
  required,
  disabled,
  rules,
  containerClassName,
}: RatingStarsInputProps) => {
  const { control } = useFormContext();
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const validationRules: RegisterOptions = { ...rules };
  if (required) {
    validationRules.required = {
      message: "Este campo é obrigatório",
      value: true,
    };
  }

  return (
    <FormField
      control={control}
      name={name}
      rules={validationRules}
      disabled={disabled}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(
            "space-y-3 text-card-foreground",
            containerClassName,
            fieldState.error && "text-destructive"
          )}
        >
          {label && (
            <FormLabel className={cn(fieldState.error && "text-destructive")}>
              {label}
              {required && <span className="ml-0.5 text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex items-center gap-1 justify-center">
              {Array.from({ length: max - min + 1 }, (_, i) => i + min).map(
                (starValue) => {
                  const isFilled = field.disabled
                    ? field.value >= starValue
                    : (hoverValue || field.value) >= starValue;

                  return (
                    <Star
                      key={starValue}
                      size={32}
                      className={cn(
                        "transition-colors",
                        field.disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer",
                        isFilled ? "text-yellow-400" : "text-gray-300"
                      )}
                      fill={isFilled ? "currentColor" : "none"}
                      onMouseEnter={
                        !field.disabled
                          ? () => setHoverValue(starValue)
                          : undefined
                      }
                      onMouseLeave={
                        !field.disabled ? () => setHoverValue(null) : undefined
                      }
                      onClick={
                        !field.disabled
                          ? () => field.onChange(starValue)
                          : undefined
                      }
                    />
                  );
                }
              )}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

RatingStarsInput.displayName = "RatingStarsInput";
