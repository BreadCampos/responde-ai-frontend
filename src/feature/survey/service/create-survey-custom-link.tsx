import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SurveyModel } from "../model/survey.model";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";
import { CustomLinkModal } from "../model/create-survey-custom-link";
import { toast } from "sonner";

export const CreateSurveyCustomLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      surveyId,
      companyId,
      customLinkPayload,
    }: CustomLinkModal) => {
      const response = await httpClient.request<SurveyModel>({
        method: "POST",
        url: surveyApi.GET_SURVEY_CUSTOM_LINK.replace(
          ":companyId",
          companyId
        ).replace(":surveyId", surveyId),
        body: customLinkPayload,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Link personalizado criado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["survey-custom-link-list"],
      });
    },
  });
};
