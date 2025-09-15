import { httpClient } from "@/core/api/fetch-api";
import { useTranslation } from "@/shared/hooks/use-translation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { surveyApi } from "../api";
import { CreateCustomLinkModel } from "../model/create-survey-custom-link";
import type { SurveyModel } from "../model/survey.model";

export const CreateSurveyCustomLinkMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("surveys");
  return useMutation({
    mutationFn: async ({
      surveyId,
      companyId,
      customLinkPayload,
    }: CreateCustomLinkModel) => {
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
      toast.success(t("surveyDetails.customLink.form.success"));
      queryClient.invalidateQueries({
        queryKey: ["survey-custom-link-list"],
      });
    },
  });
};
