import { httpClient } from "@/core/api/fetch-api";
import { useQuery } from "@tanstack/react-query";
import { surveyApi } from "../../survey/api";
import { SurveyResponseDetailModel } from "../../survey/model/survey-response-details";

export const GetSurveyResponsesDetailsQuery = ({
  surveyId,
  companyId,
  surveyResponseId,
}: {
  surveyId: string;
  surveyResponseId: string;
  companyId?: string;
}) => {
  const queryKey = ["survey-response-details", surveyResponseId];

  return useQuery({
    queryKey,
    enabled: !!surveyId && !!companyId && !!surveyResponseId,
    queryFn: async () => {
      const url = surveyApi.GET_SURVEY_RESPONSE_DETAILS.replace(
        ":companyId",
        companyId || ""
      )
        .replace(":surveyId", surveyId)
        .replace(":surveyResponseId", surveyResponseId);

      const formattedUrl = `${url}`;

      const response = await httpClient.request<SurveyResponseDetailModel>({
        method: "GET",
        url: formattedUrl,
      });
      return response.data;
    },
    retry: 1,
  });
};
