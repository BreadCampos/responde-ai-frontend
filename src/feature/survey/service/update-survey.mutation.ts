import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SurveyModel } from "../model/survey.model";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/routes/route-constants";

export const UpdateSurveyMutation = () => {
  const queryClient = useQueryClient();

  const navigate = useRouter();

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
    onSuccess: (response) => {
      if (response.id) {
        navigate.push(ROUTES.SURVEY_DETAILS.replace(":id", response.id));
        queryClient.invalidateQueries({
          queryKey: ["survey-details"],
        });
      }
    },
  });
};
