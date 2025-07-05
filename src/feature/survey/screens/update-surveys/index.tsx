"use client";

import { useForm } from "react-hook-form";
import { SurveyForm } from "../../components/survey-form";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { SurveyModel } from "../../model/survey.model";
import { UpdateSurveyMutation } from "../../service/update-survey.mutation";
import { useParams } from "next/navigation";
import { GetSurveyQuery } from "../../service/get-survey.query";
import { useEffect } from "react";
import { Form } from "@/shared/components/ui/form";

export const UpdateSurvey = () => {
  const { company } = useAuthStore();
  const surveyMutation = UpdateSurveyMutation();

  const { surveyId } = useParams<{ surveyId: string }>();
  const { data: survey } = GetSurveyQuery({
    companyId: company?.id || "",
    surveyId: surveyId || "",
  });

  const methods = useForm<SurveyModel>({
    defaultValues: {
      title: "Novo questionário",
      questions: [],
    },
  });

  const onUpdateSurvey = (survey: SurveyModel) => {
    if (!company?.id || !surveyId) {
      return;
    }

    surveyMutation.mutate({
      companyId: company?.id,
      survey,
      surveyId,
    });
  };

  useEffect(() => {
    if (survey) {
      methods.reset(survey);
    }
  }, [survey, methods]);
  return (
    <Form {...methods}>
      <SurveyForm
        buttonSubmitText="Atualizar"
        onSubmit={onUpdateSurvey}
        loading={surveyMutation?.isPending}
      />
    </Form>
  );
};
