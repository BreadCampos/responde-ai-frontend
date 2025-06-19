import { SelectInput, TextInput } from "@/shared/components/form";
import { useFormContext } from "react-hook-form";

import { useEffect } from "react";
import { SelectOption } from "@/shared/types/select-options.type";
import { IForm } from "../..";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";

export const RattingType = () => {
  const { handleFormatMinMaxValue } = useFormatValues();
  const { watch, setValue } = useFormContext<IForm>();
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
      setValue("ratingOptions.minLabel", "Não Recomendo");
      setValue("ratingOptions.maxLabel", "Recomendo Totalmente");
    }
  }, [formValues.ratingOptions?.style, setValue]);

  const maxValue = () => {
    if (formValues?.ratingOptions?.style === "stars") {
      return 5;
    }
    if (formValues?.ratingOptions?.style === "nps") {
      return 10;
    }
    return undefined;
  };

  return (
    <div>
      {formValues?.type === "rating" && (
        <div className="p-4 bg-card rounded-md space-y-4 border">
          <h4 className="font-medium text-card-foreground">
            Opções de Avaliação
          </h4>
          <SelectInput
            name="ratingOptions.style"
            label="Estilo de Exibição"
            options={rattingOptions}
          />
          {formValues?.ratingOptions?.style === "nps" && (
            <div className="flex flex-col gap-4">
              <TextInput
                name="ratingOptions.minLabel"
                label="Label do valor mínimo"
              />
              <TextInput
                label="Label do valor maximo"
                name="ratingOptions.maxLabel"
              />
            </div>
          )}
          <div className="flex gap-4">
            <TextInput
              name="ratingOptions.min"
              label="Valor Mínimo"
              type="number"
              defaultValue={1}
              disabled={formValues?.ratingOptions?.style === "nps"}
              onKeyPress={(e) => {
                handleFormatMinMaxValue(e, 0, maxValue());
              }}
            />
            <TextInput
              name="ratingOptions.max"
              label="Valor Máximo"
              type="number"
              disabled={formValues?.ratingOptions?.style === "nps"}
              max={maxValue()}
              min={formValues?.ratingOptions?.min || 0}
              onKeyPress={(e) => {
                handleFormatMinMaxValue(
                  e,
                  formValues?.ratingOptions?.min || 0,
                  maxValue()
                );
              }}
              defaultValue={5}
            />
          </div>
        </div>
      )}
    </div>
  );
};
