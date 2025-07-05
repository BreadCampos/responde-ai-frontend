import { httpClient } from "@/core/api/fetch-api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { DispatchSessionMetrics } from "../../../shared/utils/send-user-metrics";
import { surveyApi } from "../api";
import { CreateSurveyResponse } from "../model/create-survey-response.jsx";
import type { SurveyPublicInfoModel } from "../model/public-survey-info.tsx";

export const CreatePublicSurveyResponseMutation = () => {
  return useMutation({
    mutationFn: async ({
      surveyId,
      responses,
      customLinkRef,
      sessionIdentifier,
    }: {
      surveyId: string;
      responses: CreateSurveyResponse;
      customLinkRef: string | null;
      sessionIdentifier?: string;
    }) => {
      let url = surveyApi.CREATE_PUBLIC_SURVEY_RESPONSE.replace(
        ":surveyId",
        surveyId
      );
      const searchParams = new URLSearchParams();
      if (customLinkRef) {
        searchParams.append("customLinkRef", customLinkRef);
      }
      if (sessionIdentifier) {
        searchParams.append("sessionIdentifier", sessionIdentifier);
      }
      url = `${url}?=${searchParams.toString()}`;
      const response = await httpClient.request<SurveyPublicInfoModel>({
        method: "POST",
        url: url,
        headers: {
          Authorization: "",
        },
        body: responses,
      });
      DispatchSessionMetrics(surveyId);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Sua resposta foi enviada com sucesso!");
    },
  });
};
