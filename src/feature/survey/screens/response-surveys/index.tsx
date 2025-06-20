"use client";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { GetSurveyQuery } from "../../service/get-survey.query";
import { QuestionsFormPreview } from "../../components/questions-form-preview";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingSkeleton } from "./components/loadgin-skeleton";

interface Props {
  surveyId: string;
}

export const ResponseSurvey = ({ surveyId }: Props) => {
  const { company } = useAuthStore();

  const methods = useForm();

  //TODO: Alterar para pegar SEM company
  const { data: survey, isLoading } = GetSurveyQuery({
    companyId: company?.id || "",
    surveyId: surveyId || "",
  });

  if (isLoading) {
    <LoadingSkeleton />;
  }

  if (!survey) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl font-bold">Erro ao Carregar Formulário</h1>
        <p className="text-muted-foreground">
          Não foi possível encontrar os dados deste formulário. Tente novamente
          mais tarde.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center justify-center h-full">
        {survey?.questions?.[0] && (
          <div className="w-full max-w-[800px] h-[calc(100vh-100px)]  flex-1 p-4 bg-card rounded-md space-y-4 border">
            <QuestionsFormPreview
              questions={survey?.questions}
              title={survey?.title}
              className="max-w-full border-none h-[calc(100vh-110px)] max-h-[calc(100vh - 200px)] min-h-auto shadow-none rounded-none overflow-y-auto p-0"
              logoUrl={company?.logoUrl || ""}
            />
          </div>
        )}{" "}
      </div>
    </FormProvider>
  );
};
