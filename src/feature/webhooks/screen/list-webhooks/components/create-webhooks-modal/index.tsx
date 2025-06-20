import { WebhookForm } from "@/feature/webhooks/components/webhook-form";
import { Button } from "@/shared/components/button";
import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useForm } from "react-hook-form";
import {
  resolverCreateWebhooksSchema,
  CreateWebhooksSchemaType,
} from "./create-webhooks.schema";
import { useCreateWebhookMutation } from "@/feature/webhooks/service/create-company.mutation";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";

export const CreateWebhooksModal = () => {
  const [openModal, setOpenModal] = useToggle();

  const methods = useForm<CreateWebhooksSchemaType>({
    resolver: resolverCreateWebhooksSchema,
    defaultValues: {
      url: "",
      subscribedEvents: [],
    },
  });

  const { company } = useAuthStore();
  const { mutate, isPending } = useCreateWebhookMutation();
  const onCreateWebhook = (data: CreateWebhooksSchemaType) => {
    if (company?.id) {
      mutate({
        webhook: data,
        companyId: company?.id || "",
      });
      setOpenModal();
    }
  };
  const onClose = () => {
    setOpenModal();
    methods.reset();
  };

  return (
    <Form {...methods}>
      <Button variant="default" onClick={setOpenModal}>
        Criar Webhook
      </Button>
      <Modal
        open={openModal}
        onClose={onClose}
        title={"Create Webhook"}
        className="w-full max-w-xl"
        primaryButton={{
          title: "Criar",
          type: "submit",
          loading: isPending,
          onClick: methods.handleSubmit(onCreateWebhook),
          disabled: isPending,
        }}
      >
        <div className="mb-4">
          <WebhookForm />
        </div>
      </Modal>
    </Form>
  );
};
