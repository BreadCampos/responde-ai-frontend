import { useQuery } from "@tanstack/react-query";
import type { SurveyPublicInfoModel } from "../model/public-survey-info.tsx";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";

export const GetPublicSurveyInfoQuery = ({
  surveyId,
}: {
  surveyId: string;
}) => {
  const queryKey = ["survey-public", surveyId];

  return useQuery({
    queryKey,
    enabled: !!surveyId,
    queryFn: async () => {
      const url = surveyApi.GET_PUBLIC_SURVEY_INFO.replace(
        ":surveyId",
        surveyId
      );

      const response = await httpClient.request<SurveyPublicInfoModel>({
        method: "GET",
        url: url,
        headers: {
          Authorization: "",
        },
      });
      return response.data;
    },
    retry: 1,
  });
};
