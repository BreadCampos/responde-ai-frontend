import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { WebhookForm } from "@/feature/webhooks/components/webhook-form";
import { WebhooksModel } from "@/feature/webhooks/model/webhooks.model";
import { useUpdateWebhookMutation } from "@/feature/webhooks/service/update-company.mutation";
import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  resolverUpdateWebhooksSchema,
  UpdateWebhooksSchemaType,
} from "./update-webhooks.schema";

export interface Props {
  webhook: WebhooksModel | null;
  open: boolean;
  toggleModal: () => void;
}
export const UpdateWebhooksModal = ({ webhook, toggleModal, open }: Props) => {
  const methods = useForm<UpdateWebhooksSchemaType>({
    resolver: resolverUpdateWebhooksSchema,
  });

  const { company } = useAuthStore();
  const { mutate, isPending } = useUpdateWebhookMutation();
  const onUpdateWebhook = (data: UpdateWebhooksSchemaType) => {
    if (company?.id && webhook) {
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

  useEffect(() => {
    if (open && webhook) {
      methods.reset({
        url: webhook.url,
        subscribedEvents: webhook.subscribedEvents,
      });
    }
  }, [open, webhook, methods]);

  return (
    <Form {...methods}>
      <Modal
        open={open}
        onClose={onClose}
        title={"Create Webhook"}
        className="w-full max-w-xl"
        primaryButton={{
          title: "Atualizar Webhook",
          type: "submit",
          loading: isPending,
          onClick: methods.handleSubmit(onUpdateWebhook),
          disabled: isPending,
        }}
      >
        <div className="mb-2">
          <WebhookForm />
        </div>
      </Modal>
    </Form>
  );
};
