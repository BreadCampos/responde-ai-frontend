import { useFormContext, type RegisterOptions } from "react-hook-form";
import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { SelectOption } from "@/shared/types/select-options.type";

export interface CheckboxGroupInputProps {
  name: string;
  label?: string;
  description?: string;
  options: SelectOption[];
  required?: boolean;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  containerClassName?: string;
  disabled?: boolean;
}

export const CheckboxGroupInput = ({
  name,
  label,
  description,
  options,
  required,
  rules,
  containerClassName,
  disabled,
}: CheckboxGroupInputProps) => {
  const { control } = useFormContext();

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
      render={() => (
        <FormItem
          className={cn("space-y-3 text-card-foreground", containerClassName)}
        >
          <div className="mb-4">
            {label && (
              <FormLabel>
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
              </FormLabel>
            )}
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          {options.map((option) => (
            <FormField
              key={
                option.value != null && typeof option.value !== "boolean"
                  ? String(option.value)
                  : String(option.label)
              }
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem
                    key={
                      option.value != null && typeof option.value !== "boolean"
                        ? String(option.value)
                        : String(option.label)
                    }
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        disabled={disabled}
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const currentValues = Array.isArray(field.value)
                            ? field.value
                            : [];
                          return checked
                            ? field.onChange([...currentValues, option.value])
                            : field.onChange(
                                currentValues.filter(
                                  (value) => value !== option.value
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {option.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
