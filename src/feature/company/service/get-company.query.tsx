import { httpClient } from "@/core/api/fetch-api";
import { useQuery } from "@tanstack/react-query";
import { companyApi } from "../api";

import type { CompanyModel } from "../model/company.model";

type ResponseType = CompanyModel | undefined;

export const GetCompanyQuery = ({ id }: { id?: string }) => {
  const queryKey = ["company-by-id", id];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!id) return undefined;
      const url = companyApi.GET_COMPANY.replace(":id", id);
      const response = await httpClient.request<ResponseType>({
        method: "GET",
        url: url,
      });
      return response.data;
    },
  });
};
