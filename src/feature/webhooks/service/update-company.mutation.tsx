import { useMutation, useQueryClient } from "@tanstack/react-query";
import { webhookApi } from "../api";
import type { UpdateWebhooks } from "../model/update-webhooks.model";
import { httpClient } from "@/core/api/fetch-api";
import type { WebhooksModel } from "../model/webhooks.model";
import { toast } from "sonner";

export const useUpdateWebhookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      webhook,
      companyId,
      webhookId,
    }: {
      webhook: UpdateWebhooks;
      companyId: string;
      webhookId: string;
    }) => {
      const url = webhookApi.UPDATE_WEBHOOK.replace(
        ":companyId",
        companyId
      ).replace(":webhookId", webhookId);
      const response = await httpClient.request<WebhooksModel>({
        method: "PATCH",
        url,
        body: webhook,
      });
      return response.data;
    },
    onSuccess: async () => {
      toast.success("Webhook atualizado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["webhooks-list"],
      });
    },
  });
};
