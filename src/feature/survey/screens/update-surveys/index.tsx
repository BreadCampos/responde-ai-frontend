"use client";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { Form } from "@/shared/components/ui/form";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SurveyForm } from "../../components/survey-form";
import { SurveyModel } from "../../model/survey.model";
import { GetSurveyQuery } from "../../service/get-survey.query";
import { UpdateSurveyMutation } from "../../service/update-survey.mutation";

export const UpdateSurvey = () => {
  const { company } = useAuthStore();
  const surveyMutation = UpdateSurveyMutation();

  const { surveyId } = useParams<{ surveyId: string }>();
  const { data: survey } = GetSurveyQuery({
    companyId: company?.id || "",
    surveyId: surveyId || "",
  });

  const methods = useForm<
    SurveyModel & {
      deletedQuestionIds: string[];
      newQuestionIds: string[];
    }
  >({
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
