import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SurveyModel } from "../model/survey.model";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/routes/route-constants";

export const CreateSurveyMutation = () => {
  const queryClient = useQueryClient();

  const navigate = useRouter();

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
