// components/logo-upload-modal.tsx

import { CompanyLogo } from "@/shared/components/company-logo";
import Modal from "@/shared/components/modal";
import { useTranslation } from "@/shared/hooks/use-translation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  currentLightLogo?: string;
  currentDarkLogo?: string;
  companyName?: string;
}

export const LogoUploadModal = ({ open, onClose, companyName }: Props) => {
  const { setValue, watch } = useFormContext();
  const { t } = useTranslation("login");

  const logoLightFile = watch("company.logoLightFile");
  const logoDarkFile = watch("company.logoDarkFile");

  const initialLightLogoUrl = watch("company.logoUrl");
  const initialDarkLogoUrl = watch("company.darkLogoUrl");

  const [lightPreview, setLightPreview] = useState<string>("");
  const [darkPreview, setDarkPreview] = useState<string>("");

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    variant: "light" | "dark"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (variant === "light") {
        setLightPreview(previewUrl);
        setValue("company.logoLightFile", file, { shouldValidate: true });
      } else {
        setDarkPreview(previewUrl);
        setValue("company.logoDarkFile", file, { shouldValidate: true });
      }
    }
  };

  const handleConfirm = () => {
    onClose();
  };

  useEffect(() => {
    if (open) {
      if (logoLightFile instanceof File) {
        setLightPreview(URL.createObjectURL(logoLightFile));
      } else {
        setLightPreview(initialLightLogoUrl || null);
      }

      if (logoDarkFile instanceof File) {
        setDarkPreview(URL.createObjectURL(logoDarkFile));
      } else {
        setDarkPreview(initialDarkLogoUrl || null);
      }
    }
  }, [
    open,
    logoLightFile,
    logoDarkFile,
    initialLightLogoUrl,
    initialDarkLogoUrl,
  ]);

  useEffect(() => {
    return () => {
      if (lightPreview && lightPreview?.startsWith("blob:"))
        URL.revokeObjectURL(lightPreview);
      if (darkPreview && darkPreview?.startsWith("blob:"))
        URL.revokeObjectURL(darkPreview);
    };
  }, [lightPreview, darkPreview]);

  return (
    <Modal
      title={t("register.company.logoModal.title")}
      open={open}
      onClose={onClose}
      primaryButton={{
        title: t("register.company.logoModal.buttons.confirm"),
        onClick: handleConfirm,
      }}
      className="w-full max-w-4xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2">
        <div className="flex flex-col items-center space-y-4">
          <h4 className="font-semibold">
            {t("register.company.logoModal.lightTheme")}
          </h4>
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border">
            <CompanyLogo
              src={lightPreview}
              name={companyName}
              // className="min-w-[200px]"
            />
          </div>
          <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/40 transition-colors">
            {t("register.company.logoModal.buttons.selectImage")}
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={(e) => handleFileChange(e, "light")}
            />
          </label>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <h4 className="font-semibold">
            {t("register.company.logoModal.darkTheme")}
          </h4>
          <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700">
            <CompanyLogo src={darkPreview} name={companyName} />
          </div>

          <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/40 transition-colors">
            {t("register.company.logoModal.buttons.selectImage")}
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={(e) => handleFileChange(e, "dark")}
            />
          </label>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-4 px-4">
        {t("register.company.logoModal.helperText")}
      </p>
    </Modal>
  );
};
