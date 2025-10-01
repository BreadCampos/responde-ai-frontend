import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/core/api/fetch-api";
import { companyApi } from "../api";
import type { CompanyModel } from "../model/company.model";
import type { UpdateCompanyModel } from "../model/update-company.model";

export const useUpdateCompanyMutation = () => {
  const queryClient = useQueryClient();

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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["company-list"] });
    },
  });
};
