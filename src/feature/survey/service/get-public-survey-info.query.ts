import { httpClient } from "@/core/api/fetch-api";
import { useQuery } from "@tanstack/react-query";
import { surveyApi } from "../api";
import type { SurveyPublicInfoModel } from "../model/public-survey-info.tsx";

export const GetPublicSurveyInfoQuery = ({
  surveyId,
  customLinkRef,
  sessionIdentifier,
}: {
  surveyId: string;
  customLinkRef?: string;
  sessionIdentifier?: string;
}) => {
  const queryKey = ["survey-public-info", surveyId];

  return useQuery({
    queryKey,
    enabled: !!surveyId,
    queryFn: async () => {
      let url = surveyApi.GET_PUBLIC_SURVEY_INFO.replace(":surveyId", surveyId);
      const params = new URLSearchParams();
      if (customLinkRef) {
        params.append("customLinkRef", customLinkRef);
      }
      if (sessionIdentifier) {
        params.set("sessionIdentifier", sessionIdentifier);
      }
      url = `${url}?${params.toString()}`;
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
