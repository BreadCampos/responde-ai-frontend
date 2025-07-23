import { SelectInput, TextInput } from "@/shared/components/form";
import { useFormContext } from "react-hook-form";

import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useTranslation } from "@/shared/hooks/use-translation";
import { SelectOption } from "@/shared/types/select-options.type";
import { useEffect } from "react";
import { IForm } from "../..";

export const RattingType = () => {
  const { t } = useTranslation("surveys");

  const { handleFormatMinMaxValue } = useFormatValues();
  const { watch, setValue } = useFormContext<IForm>();
  const formValues = watch();

  const rattingOptions: SelectOption[] = [
    { value: "stars", label: t("surveyModal.rating.styles.stars") },
    { value: "slider", label: t("surveyModal.rating.styles.slider") },
    { value: "nps", label: t("surveyModal.rating.styles.nps") },
  ];

  useEffect(() => {
    if (formValues.ratingOptions?.style === "nps") {
      setValue("ratingOptions.min", 0);
      setValue("ratingOptions.max", 10);
      setValue(
        "ratingOptions.minLabel",
        t("surveyModal.rating.nps.minLabelDefault")
      );
      setValue(
        "ratingOptions.maxLabel",
        t("surveyModal.rating.nps.maxLabelDefault")
      );
    }
  }, [formValues.ratingOptions?.style, setValue, t]);

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
        <div className="p-4 bg-card rounded-lg space-y-4 border">
          <h4 className="font-medium text-card-foreground">
            {t("surveyModal.rating.title")}
          </h4>
          <SelectInput
            name="ratingOptions.style"
            label={t("surveyModal.rating.fields.style.label")}
            options={rattingOptions}
          />
          {formValues?.ratingOptions?.style === "nps" && (
            <div className="flex flex-col gap-4">
              <TextInput
                name="ratingOptions.minLabel"
                label={t("surveyModal.rating.fields.minLabel.label")}
              />
              <TextInput
                label={t("surveyModal.rating.fields.maxLabel.label")}
                name="ratingOptions.maxLabel"
              />
            </div>
          )}
          <div className="flex gap-4">
            <TextInput
              name="ratingOptions.min"
              label={t("surveyModal.rating.fields.min.label")}
              type="number"
              defaultValue={1}
              disabled={formValues?.ratingOptions?.style === "nps"}
              onKeyPress={(e) => {
                handleFormatMinMaxValue(e, 0, maxValue());
              }}
            />
            <TextInput
              name="ratingOptions.max"
              label={t("surveyModal.rating.fields.max.label")}
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
