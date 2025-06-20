import { useQuery } from "@tanstack/react-query";
import type { SurveyModel } from "../model/survey.model";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";

export const GetSurveyQuery = ({
  companyId,
  surveyId,
}: {
  companyId: string;
  surveyId: string;
}) => {
  const queryKey = ["survey-details", companyId, surveyId];

  return useQuery({
    queryKey,
    enabled: !!companyId && !!surveyId,
    queryFn: async () => {
      const url = surveyApi.GET_SURVEY.replace(":companyId", companyId).replace(
        ":surveyId",
        surveyId
      );

      const response = await httpClient.request<SurveyModel>({
        method: "GET",
        url: url,
      });
      return response.data;
    },
  });
};
