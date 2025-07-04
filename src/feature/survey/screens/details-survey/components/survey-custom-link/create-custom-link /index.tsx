import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import {
  addCustomLinkResolver,
  AddCustomLinkValues,
} from "../form-custom-link /add-custom-link.shema";
import { CreateSurveyCustomLinkMutation } from "@/feature/survey/service/create-survey-custom-link.mutation";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useParams } from "next/navigation";
import { FormCustomLink } from "../form-custom-link ";
import { useToggle } from "@/shared/hooks/use-toggle";
import { Button } from "@/shared/components/button";

export const ModalCreateCustomLink = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [openModal, toggleOpenModal] = useToggle();

  const methods = useForm<AddCustomLinkValues>({
    resolver: addCustomLinkResolver,
    defaultValues: {
      name: "",
      usageLimit: 1,
      isActive: true,
    },
  });
  const { company } = useAuthStore();
  const { mutate, isPending } = CreateSurveyCustomLinkMutation();

  const onClose = () => {
    methods.reset();
    toggleOpenModal();
  };
  const onSubmit = (data: AddCustomLinkValues) => {
    if (!surveyId || !company?.id) {
      return;
    }
    mutate({
      surveyId: surveyId,
      companyId: company?.id,
      customLinkPayload: {
        isActive: data.isActive || false,
        name: data.name,
        usageLimit: data.usageLimit || 1,
      },
    });
  };

  return (
    <Form {...methods}>
      <Button variant="default" size={"sm"} onClick={toggleOpenModal}>
        Adicionar link personalizado
      </Button>
      <FormCustomLink
        submit={onSubmit}
        loading={isPending}
        open={openModal}
        onClose={onClose}
      />
    </Form>
  );
};
