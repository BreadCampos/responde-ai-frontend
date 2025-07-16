import { httpClient } from "@/core/api/fetch-api";
import { useNavigation } from "@/shared/hooks/use-nagivation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { surveyApi } from "../api";
import type { SurveyModel } from "../model/survey.model";

export const UpdateSurveyMutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigation();

  return useMutation<
    SurveyModel,
    Error,
    { survey: SurveyModel; companyId: string; surveyId: string }
  >({
    mutationFn: async ({
      survey,
      companyId,
      surveyId,
    }: {
      survey: SurveyModel;
      companyId: string;
      surveyId: string;
    }) => {
      const response = await httpClient.request<SurveyModel>({
        method: "PATCH",
        url: surveyApi.UPDATE_SURVEY.replace(":companyId", companyId).replace(
          ":surveyId",
          surveyId
        ),
        body: survey,
      });
      if (!response.data) {
        throw new Error("No data returned from mutation");
      }
      return response.data;
    },
    onSuccess: () => {
      navigate.back();
      queryClient.invalidateQueries({
        queryKey: ["survey-details"],
      });
    },
  });
};
