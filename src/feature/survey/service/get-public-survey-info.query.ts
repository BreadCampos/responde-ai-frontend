import { useQuery } from "@tanstack/react-query";
import type { SurveyPublicInfoModel } from "../model/public-survey-info.tsx";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";

export const GetPublicSurveyInfoQuery = ({
  surveyId,
  customLinkRef,
}: {
  surveyId: string;
  customLinkRef?: string;
}) => {
  const queryKey = ["survey-public-info", surveyId];

  return useQuery({
    queryKey,
    enabled: !!surveyId,
    queryFn: async () => {
      let url = surveyApi.GET_PUBLIC_SURVEY_INFO.replace(":surveyId", surveyId);

      if (customLinkRef) {
        url += `?customLinkRef=${customLinkRef}`;
      }
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
