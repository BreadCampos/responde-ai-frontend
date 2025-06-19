import { Button } from "@/shared/components/button";
import { TextInput } from "@/shared/components/form";
import { Label } from "@/shared/components/ui/label";
import { XIcon } from "lucide-react";
import { Key } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
export const typesWithOptions = [
  "select",
  "radio",
  "checkbox_group",
  "select_multiple",
];

export const ControlledOptions = ({}) => {
  const {
    control,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "selectOptions",
  });

  const formValues = watch();
  const needsOptions = typesWithOptions.includes(formValues?.type);

  return (
    <div>
      {needsOptions && (
        <div className="space-y-3 pt-4 border-t">
          <Label>Opções da Questão</Label>
          {(fields || [])?.map(
            (field: { id: Key | null | undefined }, index: number) => (
              <div key={field.id} className="flex items-center gap-2">
                <TextInput
                  name={`selectOptions.${index}.label`}
                  placeholder={`Label ${index + 1}`}
                  containerClassName="flex-grow"
                />
                <TextInput
                  name={`selectOptions.${index}.value`}
                  placeholder={`Valor ${index + 1}`}
                  containerClassName="flex-grow"
                  onChange={() => {
                    clearErrors("selectOptions");
                  }}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              append({ value: null, label: null });
            }}
          >
            Adicionar Opção +
          </Button>
          {errors.selectOptions && (
            <p className="text-sm font-medium text-destructive">
              {errors.selectOptions.message as string}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
