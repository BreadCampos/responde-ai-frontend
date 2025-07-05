import { httpClient } from "@/core/api/fetch-api";
import { useQuery } from "@tanstack/react-query";
import { companyApi } from "../api";

import type {
  DefaultPagination,
  PaginatedResponse,
} from "@/shared/model/pagination.model";
import { mountQuery } from "@/shared/utils/mount-query";
import type { CompanyModel } from "../model/company.mode";

type ReponseType = PaginatedResponse<CompanyModel> | undefined;

export const GetCompaniesListQuery = ({
  pagination,
  enabled = true,
}: {
  pagination: DefaultPagination;
  enabled?: boolean;
}) => {
  const queryKey = ["company-list"];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = companyApi.LIST_COMPANY;

      const makeUrl = `${url}?${mountQuery(pagination)}`;

      const response = await httpClient.request<ReponseType>({
        method: "GET",
        url: makeUrl,
      });
      return response.data;
    },
    enabled,
  });
};
