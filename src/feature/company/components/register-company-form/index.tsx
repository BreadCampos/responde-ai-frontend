import { SignupWithCompanyFormValues } from "@/feature/users/screen/register/register.schama";
import { DefaultAvatar } from "@/shared/components/avatar";
import { Button } from "@/shared/components/button";
import { CheckboxInput, TextInput } from "@/shared/components/form";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useTranslation } from "@/shared/hooks/use-translation";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { LogoUploadModal } from "../modal-input-logo";

interface Props {
  title?: string;
}
export const RegisterCompanyForm = ({ title }: Props) => {
  const {
    watch,
    formState: { errors },
  } = useFormContext<SignupWithCompanyFormValues>();
  const { t } = useTranslation("login");
  const company = watch("company");
  const { handleDocumentMask } = useFormatValues();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const logoLightFile = watch("company.logoLightFile");
  const logoDarkFile = watch("company.logoDarkFile");
  const [logoPreview, setLogoPreview] = useState<string | undefined>();

  useEffect(() => {
    const fileForPreview = logoLightFile || logoDarkFile;

    if (fileForPreview instanceof File) {
      console.log({ asd: logoLightFile || logoDarkFile });
      const fileUrl = URL.createObjectURL(fileForPreview);
      setLogoPreview(fileUrl);

      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    }
  }, [logoLightFile, logoDarkFile]);

  const logoError =
    errors.company?.logoLightFile?.message ||
    errors.company?.logoDarkFile?.message;

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
        <div className="flex items-center gap-4">
          <DefaultAvatar
            src={logoPreview}
            name={company?.fantasyName}
            className="size-14"
          />
          <Button type="button" onClick={() => setIsModalOpen(true)}>
            {t("register.company.buttons.uploadLogo")}
          </Button>
        </div>
        {logoError && (
          <p className="text-xs text-destructive mt-1">{logoError as string}</p>
        )}
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

      <LogoUploadModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        companyName={company?.fantasyName}
      />
    </div>
  );
};
