import { useMutation } from "@tanstack/react-query";

import { companyApi } from "../api";
import type { CreateCompanyModel } from "../model/create-company.model";
import { httpClient } from "@/core/api/fetch-api";
import type { CompanyModel } from "../model/company.mode";
import { ROUTES } from "@/core/routes/route-constants";

export const useCreateCompanyMutation = () => {
  return useMutation({
    mutationFn: async ({
      accessToken,
      company,
    }: {
      company: CreateCompanyModel;
      accessToken: string;
    }) => {
      const response = await httpClient.request<CompanyModel>({
        method: "POST",
        url: companyApi.CREATE_COMPANY,
        body: company,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
    onSuccess: async (response) => {
      if (response) {
        window.location.replace(ROUTES.DASHBOARD);
      }
    },
  });
};
