import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SurveyModel } from "../model/survey.model";
import { httpClient } from "@/core/api/fetch-api";
import { surveyApi } from "../api";
import { UpdateCustomLinkModel } from "../model/update-survey-custom-link";
import { toast } from "sonner";

export const UpdateSurveyCustomLinkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      surveyId,
      companyId,
      customLinkId,
      customLinkPayload,
    }: UpdateCustomLinkModel) => {
      const response = await httpClient.request<SurveyModel>({
        method: "PATCH",
        url: surveyApi.UPDATE_SURVEY_CUSTOM_LINK.replace(
          ":companyId",
          companyId
        )
          .replace(":surveyId", surveyId)
          .replace(":customLinkId", customLinkId),
        body: customLinkPayload,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Link atualizado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["survey-custom-link-list"],
      });
    },
  });
};
