import { WebhookForm } from "@/feature/webhooks/components/webhook-form";
import { Button } from "@/shared/components/button";
import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useForm } from "react-hook-form";
import {
  resolverUpdateWebhooksSchema,
  UpdateWebhooksSchemaType,
} from "./update-webhooks.schema";
import { useUpdateWebhookMutation } from "@/feature/webhooks/service/update-company.mutation";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { Edit } from "lucide-react";
import { WebhooksModel } from "@/feature/webhooks/model/webhooks.model";

export interface Props {
  webhook: WebhooksModel;
}
export const UpdateWebhooksModal = ({ webhook }: Props) => {
  const [openModal, toggleModal] = useToggle();

  const methods = useForm<UpdateWebhooksSchemaType>({
    resolver: resolverUpdateWebhooksSchema,
  });

  const { company } = useAuthStore();
  const { mutate, isPending } = useUpdateWebhookMutation();
  const onCreateWebhook = (data: UpdateWebhooksSchemaType) => {
    if (company?.id) {
      mutate({
        webhook: data,
        webhookId: webhook.id,
        companyId: company?.id || "",
      });
      toggleModal();
    }
  };
  const onClose = () => {
    toggleModal();
    methods.reset();
  };

  const openUpdateModal = () => {
    console.log("webhook", webhook);
    toggleModal();
    methods.reset({
      url: webhook.url,
      subscribedEvents: ["*"],
    });
  };

  return (
    <Form {...methods}>
      <Button size="icon" onClick={openUpdateModal}>
        <Edit className="h-4 w-4" />
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
