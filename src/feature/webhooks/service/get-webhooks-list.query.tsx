import { httpClient } from "@/core/api/fetch-api";
import { useQuery } from "@tanstack/react-query";
import { webhookApi } from "../api";

import type {
  DefaultPagination,
  PaginatedResponse,
} from "@/shared/model/pagination.model";
import { mountQuery } from "@/shared/utils/mount-query";
import type { WebhooksModel } from "../model/webhooks.model";

type ReponseType = PaginatedResponse<WebhooksModel> | undefined;

export const GetWebhooksQuery = ({
  pagination,
  companyId,
}: {
  pagination: DefaultPagination;
  companyId?: string;
}) => {
  const queryKey = ["webhooks-list"];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = webhookApi.LIST_WEBHOOK.replace(
        ":companyId",
        companyId || ""
      );

      const makeUrl = `${url}?${mountQuery(pagination)}`;

      const response = await httpClient.request<ReponseType>({
        method: "GET",
        url: makeUrl,
      });
      return response.data;
    },
    enabled: !!companyId,
  });
};
