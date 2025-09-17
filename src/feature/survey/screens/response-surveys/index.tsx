"use client";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import ErrorAnimation from "@/shared/components/lotties/error.lotties";
import SuccessAnimation from "@/shared/components/lotties/success.lotties";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { QuestionsForm } from "../../components/questions-form-preview";
import { CreateSurveyResponse } from "../../model/create-survey-response";
import { CreatePublicSurveyResponseMutation } from "../../service/create-public-survey-response";
import { GetPublicSurveyInfoQuery } from "../../service/get-public-survey-info.query";
import { LoadingSkeleton } from "./components/loadgin-skeleton";

interface Props {
  surveyId: string;
}

export const ResponseSurvey = ({ surveyId }: Props) => {
  const { setPublicCompany, company } = useAuthStore();

  const startDate = useMemo(() => new Date(), []);

  const searchParams = useSearchParams();

  const customLinkRef = searchParams.get("customLinkRef");

  const methods = useForm();

  const { data, isLoading, isSuccess, isError, error } =
    GetPublicSurveyInfoQuery({
      surveyId: surveyId || "",
      customLinkRef: customLinkRef || "",
    });

  const { mutate: createReponse, isSuccess: isCreationSuccess } =
    CreatePublicSurveyResponseMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    if (company?.id) {
      return toast.success(
        "Este formulário está no modo de vizualização, não é possível enviar respostas."
      );
    }
    const formattedData: CreateSurveyResponse = {
      answers: Object.keys(data).map((key) => ({
        questionId: key,
        value: data[key],
      })),
      timeToSubmitSeconds: Math.floor(
        (new Date().getTime() - startDate.getTime()) / 1000
      ),
    };

    createReponse({
      surveyId: surveyId || "",
      responses: formattedData,
      customLinkRef,
    });
  };
  useEffect(() => {
    if (isSuccess && data?.company && !company) {
      setPublicCompany({
        company: data?.company,
      });
    }
  }, [data?.company, isSuccess, setPublicCompany, company]);

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
          {error?.message ||
            "Não foi possível encontrar os dados deste formulário. Tente novamente mais tarde."}
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
              logoUrl={data?.company?.logoUrl || ""}
              onSubmit={onSubmit}
            />
          </div>
        )}
      </div>
    </FormProvider>
  );
};
