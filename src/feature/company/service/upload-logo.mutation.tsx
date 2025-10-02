import { httpClient } from "@/core/api/fetch-api";
import { useTranslation } from "@/shared/hooks/use-translation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { companyApi } from "../api";

interface UploadLogoVariables {
  companyId: string;
  variant: "light" | "dark";
  logo: File;
}

interface UploadLogoResponse {
  url: string;
}

export const useUploadCompanyLogoMutation = () => {
  const { t } = useTranslation("login");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ companyId, variant, logo }: UploadLogoVariables) => {
      const formData = new FormData();

      formData.append("file", logo);

      const url = `${companyApi?.UPLOAD_LOGO?.replace(
        ":id",
        companyId
      )}?variant=${variant}`;

      const res = await httpClient.request<UploadLogoResponse>({
        method: "POST",
        url,
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    },
    onSuccess: async () => {
      toast.success(t("register.company.toast.logoSuccess"));
      await queryClient.invalidateQueries({ queryKey: ["company-list"] });
    },
    onError: (error) => {
      console.error("Erro no upload do logo:", error);
      toast.error(t("register.company.toast.logoError"));
    },
  });
};
