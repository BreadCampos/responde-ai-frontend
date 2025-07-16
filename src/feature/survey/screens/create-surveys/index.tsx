import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { Form } from "@/shared/components/ui/form";
import { useTranslation } from "@/shared/hooks/use-translation";
import { useForm } from "react-hook-form";
import { SurveyForm } from "../../components/survey-form";
import { SurveyModel } from "../../model/survey.model";
import { CreateSurveyMutation } from "../../service/create-survey.mutation";

export const CreateSurveys = () => {
  const { company } = useAuthStore();
  const surveyMutation = CreateSurveyMutation();

  const { t } = useTranslation("surveys");

  const methods = useForm<SurveyModel>({
    defaultValues: {
      title: t("createSurvey.clickToEdit"),
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
        buttonSubmitText={t("createSurvey.buttons.create")}
        onSubmit={onCreateSurvey}
        loading={surveyMutation?.isPending}
      />
    </Form>
  );
};
