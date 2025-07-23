import { useMutation } from "@tanstack/react-query";

import { httpClient } from "@/core/api/fetch-api";
import { ROUTES } from "@/core/routes/route-constants";
import { useTranslation } from "@/shared/hooks/use-translation";
import { toast } from "sonner";
import { companyApi } from "../api";
import type { CompanyModel } from "../model/company.model";
import type { UpdateCompanyModel } from "../model/update-company.model";

export const useUpdateCompanyMutation = () => {
  const { t } = useTranslation("company");
  return useMutation({
    mutationFn: async ({
      company,
      id,
    }: {
      id: string;
      company: UpdateCompanyModel;
    }) => {
      const url = companyApi.UPDATE_COMPANY.replace(":id", id);
      const response = await httpClient.request<CompanyModel>({
        method: "PATCH",
        url,
        body: company,
      });
      return response.data;
    },
    onSuccess: async (response) => {
      if (response) {
        toast.success(t("update.successMessage"));
        window.location.replace(
          ROUTES.COMPANY_DETAILS.replace(":id", response.id)
        );
      }
    },
  });
};
