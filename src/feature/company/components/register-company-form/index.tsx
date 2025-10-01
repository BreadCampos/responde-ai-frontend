import { Button } from "@/shared/components/button";
import { CompanyLogo } from "@/shared/components/company-logo";
import { CheckboxInput, TextInput } from "@/shared/components/form";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useTheme } from "@/shared/hooks/use-theme";
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
  } = useFormContext();
  const { t } = useTranslation("login");
  const company = watch("company");
  const { handleDocumentMask } = useFormatValues();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const logoLightFile = watch("company.logoLightFile");
  const logoDarkFile = watch("company.logoDarkFile");

  const initialLogoUrl = watch("company.logoUrl");
  const initialDarkLogoUrl = watch("company.logoDarkFile");

  const [logoPreview, setLogoPreview] = useState<string | undefined>(
    initialLogoUrl || initialDarkLogoUrl
  );

  const { theme } = useTheme();

  useEffect(() => {
    console.log({ theme });
    const fileForPreview = theme === "dark" ? logoDarkFile : logoLightFile;

    console.log({ fileForPreview });

    if (fileForPreview instanceof File) {
      const fileUrl = URL.createObjectURL(fileForPreview);
      setLogoPreview(fileUrl);

      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    } else {
      setLogoPreview(initialLogoUrl || initialDarkLogoUrl);
    }
  }, [logoLightFile, logoDarkFile, initialLogoUrl, initialDarkLogoUrl, theme]);

  const logoError =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (errors.company as any)?.logoLightFile?.message ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (errors.company as any)?.logoDarkFile?.message;

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
        <div className="flex flex-col items-center gap-4">
          <CompanyLogo src={logoPreview} className="max-w-[50px]" />
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
