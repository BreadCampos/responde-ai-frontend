"use client";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { QuestionsForm } from "../../components/questions-form-preview";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingSkeleton } from "./components/loadgin-skeleton";
import { GetPublicSurveyInfoQuery } from "../../service/get-public-survey-info.query";
import { useEffect } from "react";
import ErrorAnimation from "@/shared/components/lotties/error.lotties";
import SuccessAnimation from "@/shared/components/lotties/success.lotties";
import { CreatePublicSurveyResponseMutation } from "../../service/create-public-survey-response";
import { CreateSurveyResponse } from "../../model/create-survey-response";

interface Props {
  surveyId: string;
}

export const ResponseSurvey = ({ surveyId }: Props) => {
  const { publicCompany, setPublicCompany } = useAuthStore();

  const methods = useForm();

  const { data, isLoading, isSuccess, isError } = GetPublicSurveyInfoQuery({
    surveyId: surveyId || "",
  });

  const { mutate: createReponse, isSuccess: isCreationSuccess } =
    CreatePublicSurveyResponseMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log("Submitted Data:", data);
    const formattedData: CreateSurveyResponse = {
      answers: Object.keys(data).map((key) => ({
        questionId: key,
        value: data[key],
      })),
    };

    console.log({ formattedData });
    createReponse({
      surveyId: surveyId || "",
      responses: formattedData,
    });
  };
  useEffect(() => {
    if (isSuccess && data?.company) {
      setPublicCompany({
        company: data?.company,
      });
    }
  }, [data?.company, isSuccess, setPublicCompany]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isCreationSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <SuccessAnimation />
        <h1 className="text-2xl font-bold text-card-foreground">
          Formulário Enviado com Sucesso!
        </h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <ErrorAnimation />
        <h1 className="text-2xl font-bold text-card-foreground">
          Erro ao Carregar Formulário
        </h1>
        <p className="text-accent-foreground">
          Não foi possível encontrar os dados deste formulário. Tente novamente
          mais tarde.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-center h-full">
        {data?.survey?.questions?.[0] && (
          <div className="w-full max-w-[800px] h-[calc(100vh-100px)]  flex-1 p-4 bg-card rounded-lg space-y-4 border">
            <QuestionsForm
              questions={data?.survey?.questions}
              title={data?.survey?.title}
              className="max-w-full border-none h-[calc(100vh-110px)] max-h-[calc(100vh - 200px)] min-h-auto shadow-none rounded-none overflow-y-auto p-0"
              logoUrl={publicCompany?.logoUrl || ""}
              onSubmit={onSubmit}
            />
          </div>
        )}{" "}
      </div>
    </FormProvider>
  );
};
