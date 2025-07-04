import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";
import {
  DefaultPagination,
  PaginatedResponse,
} from "@/shared/model/pagination.model.jsx";
import { mountQuery } from "@/shared/ultils/mount-query";
import { SurveyReponseModel } from "../model/survey-response";

export const GetSurveyResponsesQuery = ({
  surveyId,
  companyId,
  pagination,
}: {
  pagination: DefaultPagination;
  surveyId: string;
  companyId?: string;
}) => {
  const queryKey = ["survey-details", surveyId];

  return useQuery({
    queryKey,
    enabled: !!surveyId && !!companyId,
    queryFn: async () => {
      const url = surveyApi.GET_SURVEY_RESPONSES.replace(
        ":companyId",
        companyId || ""
      ).replace(":surveyId", surveyId);

      const formatedUrl = `${url}?${mountQuery(pagination)}`;

      const response = await httpClient.request<
        PaginatedResponse<SurveyReponseModel>
      >({
        method: "GET",
        url: formatedUrl,
      });
      return response.data;
    },
    retry: 1,
  });
};
