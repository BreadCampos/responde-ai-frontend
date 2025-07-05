import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { SurveyForm } from "../../components/survey-form";
import { CreateSurveyMutation } from "../../service/create-survey.mutation";
import { SurveyModel } from "../../model/survey.model";
import { useForm } from "react-hook-form";
import { Form } from "@/shared/components/ui/form";

export const CreateSurveys = () => {
  const { company } = useAuthStore();
  const surveyMutation = CreateSurveyMutation();

  const methods = useForm<SurveyModel>({
    defaultValues: {
      title: "Novo questionário",
      questions: [],
    },
  });

  const onCreateSurvey = (survey: SurveyModel) => {
    if (!company?.id) {
      return;
    }

    surveyMutation.mutate({
      companyId: company?.id,
      survey,
    });
  };
  return (
    <Form {...methods}>
      <SurveyForm
        buttonSubmitText="Criar questionário"
        onSubmit={onCreateSurvey}
        loading={surveyMutation?.isPending}
      />
    </Form>
  );
};
