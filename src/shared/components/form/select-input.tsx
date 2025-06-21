import * as React from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { SelectOption } from "@/shared/types/select-options.type";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export interface SelectInputProps
  extends Omit<
    React.ComponentProps<typeof Select>,
    "value" | "onValueChange" | "defaultValue"
  > {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  options: SelectOption[];
  loading?: boolean;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  triggerClassName?: string;
  contentClassName?: string;
  containerClassName?: string;
  onChange?: (value: string) => void;
}

export const SelectInput = ({
  name,
  label,
  placeholder,
  description,
  options,
  loading = false,
  required,
  rules,
  disabled,
  triggerClassName,
  contentClassName,
  onChange,
  containerClassName,
  ...props
}: SelectInputProps) => {
  const { control } = useFormContext();

  const validationRules: RegisterOptions = { ...rules };
  if (required && !validationRules.required) {
    validationRules.required =
      typeof required === "string" ? required : "Este campo é obrigatório";
  }

  return (
    <FormField
      control={control}
      name={name}
      rules={validationRules}
      render={({ field, fieldState }) => (
        <FormItem className={cn("text-card-foreground", containerClassName)}>
          {label && (
            <FormLabel
              className={cn(
                "text-card-foreground",
                fieldState.error && "text-destructive"
              )}
            >
              {label}
              {required && <span className="ml-0.5 text-destructive">*</span>}
            </FormLabel>
          )}

          <Select
            onValueChange={(e) => {
              if (onChange) {
                onChange(e);
              }
              field.onChange(e);
            }}
            value={field.value}
            defaultValue={field.value}
            disabled={disabled || loading}
            {...props}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FormControl>
                    <SelectTrigger
                      ref={field.ref}
                      className={cn(
                        "w-full",
                        triggerClassName,
                        fieldState.error && "border-destructive"
                      )}
                    >
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                </TooltipTrigger>
                {/* O Tooltip só aparece se houver um texto selecionado */}
                {field?.value && (
                  <TooltipContent>
                    <p>{field?.value.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <SelectContent className={cn(contentClassName)}>
              {loading ? (
                <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando...
                </div>
              ) : (
                options.map((option) => (
                  <SelectItem
                    key={
                      option.value === null || typeof option.value === "boolean"
                        ? `opt-${String(option.label)}`
                        : `opt-${String(option.value)}`
                    }
                    value={String(option.value)}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

SelectInput.displayName = "SelectInput";
