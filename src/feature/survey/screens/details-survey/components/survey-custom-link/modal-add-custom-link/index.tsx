import { Button } from "@/shared/components/button";
import { CheckboxInput, TextInput } from "@/shared/components/form";
import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useForm } from "react-hook-form";
import {
  addCustomLinkResolver,
  AddCustomLinkValues,
} from "./add-custom-link.shema";
import { CreateSurveyCustomLinkMutation } from "@/feature/survey/service/create-survey-custom-link";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useParams } from "next/navigation";

export const ModalAddCustomLink = () => {
  const { surveyId } = useParams<{ surveyId: string }>();

  const { company } = useAuthStore();
  const { mutate } = CreateSurveyCustomLinkMutation();
  const methods = useForm<AddCustomLinkValues>({
    resolver: addCustomLinkResolver,
    defaultValues: {
      name: "",
      usageLimit: 1,
      isActive: true,
    },
  });

  const onClose = () => {
    methods.reset();
    toggleOpenModal();
  };
  const { handleFormatMinMaxValue } = useFormatValues();
  const [openModal, toggleOpenModal] = useToggle();

  const onSubmit = (data: AddCustomLinkValues) => {
    console.log({ data });
    if (!surveyId || !company?.id) {
      console.error("Survey ID or Company ID is missing.");
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

    onClose();
  };

  return (
    <Form {...methods}>
      <Button variant="default" size={"sm"} onClick={toggleOpenModal}>
        Adicionar link personalizado
      </Button>
      <Modal
        open={openModal}
        onClose={onClose}
        className="min-w-2xl"
        primaryButton={{
          onClick: methods.handleSubmit(onSubmit),
          title: "Salvar",
        }}
        title={"Adicionar Link Customizados"}
      >
        <div className="flex flex-col gap-4 p-1">
          <TextInput name="name" placeholder="Nome do link" />
          <TextInput
            name="usageLimit"
            type={"number"}
            onKeyPress={(e) => handleFormatMinMaxValue(e, 1)}
            placeholder="Limite de uso"
          />
          <CheckboxInput name={"isActive"} label={"Ativo"} />
        </div>
      </Modal>
    </Form>
  );
};
