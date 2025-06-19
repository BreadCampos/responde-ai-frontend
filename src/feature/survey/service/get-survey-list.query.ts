import { useQuery } from "@tanstack/react-query";
import type { SurveyModel } from "../model/survey.model";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";
import type {
  DefaultPagination,
  PaginatedResponse,
} from "@/shared/model/pagination.model";
import { mountQuery } from "@/shared/ultils/mount-query";

export const GetListSurveysQuery = ({
  companyId,
  pagination,
}: {
  companyId: string;
  pagination: DefaultPagination;
}) => {
  const queryKey = ["survey-list", companyId, pagination];

  return useQuery({
    queryKey,
    queryFn: async () => {
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
