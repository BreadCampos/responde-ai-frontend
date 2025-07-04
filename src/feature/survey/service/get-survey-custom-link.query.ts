import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";
import {
  DefaultPagination,
  PaginatedResponse,
} from "@/shared/model/pagination.model.jsx";
import { mountQuery } from "@/shared/ultils/mount-query";
import { SurveyCustomLink } from "../model/survey-custom-link";

export const GetSurveyCustomLinkQuery = ({
  surveyId,
  companyId,
  pagination,
}: {
  pagination: DefaultPagination;
  surveyId: string;
  companyId?: string;
}) => {
  console.log("GetSurveyCustomLinkQuery", pagination?.page);
  const queryKey = ["survey-custom-link-list", surveyId, pagination?.page];

  return useQuery({
    queryKey,
    enabled: !!surveyId && !!companyId,
    queryFn: async () => {
      const url = surveyApi.GET_SURVEY_CUSTOM_LINK.replace(
        ":companyId",
        companyId || ""
      ).replace(":surveyId", surveyId);

      const formatedUrl = `${url}?${mountQuery(pagination)}`;

      const response = await httpClient.request<
        PaginatedResponse<SurveyCustomLink>
      >({
        method: "GET",
        url: formatedUrl,
      });
      return response.data;
    },
    retry: 1,
  });
};
