import { httpClient } from "@/core/api/fetch-api";
import type {
  DefaultPagination,
  PaginatedResponse,
} from "@/shared/model/pagination.model";
import { mountQuery } from "@/shared/utils/mount-query";
import { useQuery } from "@tanstack/react-query";
import { surveyApi } from "../api";
import type { SurveyModel } from "../model/survey.model";

export const GetListSurveysQuery = ({
  companyId,
  pagination,
}: {
  companyId?: string;
  pagination: DefaultPagination;
}) => {
  const queryKey = ["survey-list", companyId, pagination];

  return useQuery({
    queryKey,
    queryFn: async () => {
      if (!companyId) return undefined;
      const url = surveyApi.LIST_SURVEYS.replace(":companyId", companyId);
      const makeUrl = `${url}?${mountQuery(pagination)}`;

      const response = await httpClient.request<PaginatedResponse<SurveyModel>>(
        {
          method: "GET",
          url: makeUrl,
        }
      );
      return response.data;
    },
    enabled: !!companyId,
  });
};
