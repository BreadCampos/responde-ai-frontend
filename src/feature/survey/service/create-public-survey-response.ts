import { httpClient } from "@/core/api/fetch-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { surveyApi } from "../api";
import { CreateSurveyResponse } from "../model/create-survey-response.jsx";
import type { SurveyPublicInfoModel } from "../model/public-survey-info.tsx";

export const CreatePublicSurveyResponseMutation = () => {
  return useMutation({
    mutationFn: async ({
      surveyId,
      responses,
      customLinkRef,
    }: {
      surveyId: string;
      responses: CreateSurveyResponse;
      customLinkRef: string | null;
    }) => {
      let url = surveyApi.CREATE_PUBLIC_SURVEY_RESPONSE.replace(
        ":surveyId",
        surveyId
      );

      if (customLinkRef) {
        url += `?customLinkRef=${customLinkRef}`;
      }

      const response = await httpClient.request<SurveyPublicInfoModel>({
        method: "POST",
        url: url,
        headers: {
          Authorization: "",
        },
        body: responses,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Sua resposta foi enviada com sucesso!");
    },
  });
};
