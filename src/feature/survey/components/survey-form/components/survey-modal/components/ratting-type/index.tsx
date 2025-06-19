import { SelectInput, TextInput } from "@/shared/components/form";
import { useFormContext } from "react-hook-form";

import { useEffect } from "react";
import { SelectOption } from "@/shared/types/select-options.type";
export const RattingType = () => {
  const { watch, setValue } = useFormContext();
  const formValues = watch();

  const rattingOptions: SelectOption[] = [
    { value: "stars", label: "Estrelas" },
    { value: "slider", label: "Barra de Deslizar" },
    { value: "nps", label: "NPS (Escala 0-10)" },
  ];

  useEffect(() => {
    if (formValues.ratingOptions?.style === "nps") {
      setValue("ratingOptions.min", 0);
      setValue("ratingOptions.max", 10);
    }
  }, [formValues.ratingOptions?.style, setValue]);

  return (
    <div>
      {formValues?.type === "rating" && (
        <div className="p-4 bg-card rounded-md space-y-4 border">
          <h4 className="font-medium text-card-foreground">
            Opções de Avaliação
          </h4>
          <div className="flex gap-4">
            <TextInput
              name="ratingOptions.min"
              label="Valor Mínimo"
              type="number"
              defaultValue={1}
            />
            <TextInput
              name="ratingOptions.max"
              label="Valor Máximo"
              type="number"
              max={
                formValues?.ratingOptions?.style !== "slider" ? 5 : undefined
              }
              min={0}
              defaultValue={5}
            />
          </div>
          <SelectInput
            name="ratingOptions.style"
            label="Estilo de Exibição"
            options={rattingOptions}
          />
        </div>
      )}
    </div>
  );
};
