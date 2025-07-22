import { httpClient } from "@/core/api/fetch-api";
import { ROUTES } from "@/core/routes/route-constants";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { surveyApi } from "../api";
import type { SurveyModel } from "../model/survey.model";

export const CreateSurveyMutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigation();

  return useMutation({
    mutationFn: async ({
      survey,
      companyId,
    }: {
      survey: SurveyModel;
      companyId: string;
    }) => {
      const response = await httpClient.request<SurveyModel>({
        method: "POST",
        url: surveyApi.CREATE_SURVEY.replace(":companyId", companyId),
        body: survey,
      });
      return response.data;
    },
    onSuccess: () => {
      navigate.push(ROUTES.SURVEY_LIST);
      queryClient.invalidateQueries({
        queryKey: ["survey-list"],
      });
    },
  });
};
