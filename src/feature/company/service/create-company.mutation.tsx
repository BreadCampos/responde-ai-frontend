import { useMutation } from "@tanstack/react-query";

import { httpClient } from "@/core/api/fetch-api";
import { companyApi } from "../api";
import type { CompanyModel } from "../model/company.model";
import type { CreateCompanyModel } from "../model/create-company.model";

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
  });
};
