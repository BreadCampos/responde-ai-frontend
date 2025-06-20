import { useMutation, useQueryClient } from "@tanstack/react-query";
import { webhookApi } from "../api";
import type { CreateWebhooks } from "../model/create-webhooks.model";
import { httpClient } from "@/core/api/fetch-api";
import type { WebhooksModel } from "../model/webhooks.model";
import { toast } from "sonner";

export const useCreateWebhookMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      webhook,
      companyId,
    }: {
      webhook: CreateWebhooks;
      companyId: string;
    }) => {
      const url = webhookApi.CREATE_WEBHOOK.replace(":companyId", companyId);
      const response = await httpClient.request<WebhooksModel>({
        method: "POST",
        url,
        body: webhook,
      });
      return response.data;
    },
    onSuccess: async () => {
      toast.success("Webhook criado com sucesso!");
      queryClient.invalidateQueries({
        queryKey: ["webhooks-list"],
      });
    },
  });
};
