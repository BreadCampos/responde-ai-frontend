import { DefaultAvatar } from "@/shared/components/avatar";
import { CheckboxInput, TextInput } from "@/shared/components/form";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useTranslation } from "@/shared/hooks/use-translation";
import { useFormContext } from "react-hook-form";

interface Props {
  title?: string;
}
export const RegisterCompanyForm = ({ title }: Props) => {
  const { watch } = useFormContext();
  const { t } = useTranslation("login");
  const company = watch("company");
  const { handleDocumentMask } = useFormatValues();
  return (
    <div className="space-y-4">
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      <TextInput
        name="company.legalName"
        label={t("register.company.fields.legalName")}
      />
      <TextInput
        name="company.fantasyName"
        label={t("register.company.fields.fantasyName")}
      />
      <TextInput
        name="company.document"
        onKeyPress={(e) => {
          handleDocumentMask(e);
        }}
        label={t("register.company.fields.document")}
      />
      <TextInput
        name="company.addressLine"
        label={t("register.company.fields.addressLine")}
      />

      <div className="flex-col space-y-3">
        <p>{t("register.company.fields.logoUrl")}</p>
        <div className="flex flex-col md:flex-row  gap-2 items-center">
          {company?.logoUrl && (
            <DefaultAvatar
              src={company?.logoUrl}
              name={company?.fantasyName}
              className="size-14"
            />
          )}
          <TextInput name="company.logoUrl" />
        </div>
      </div>
      <TextInput
        name="company.theme.primary"
        label={t("register.company.fields.theme.primary")}
        type="color"
      />
      <CheckboxInput
        label={t("register.company.fields.settings.always_display_logo")}
        name="company.settings.always_display_logo"
      />
    </div>
  );
};
