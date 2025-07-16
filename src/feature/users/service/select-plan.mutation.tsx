import { httpClient } from "@/core/api/fetch-api";
import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../api";
import { SelectPlanModel } from "../model/select-plan.model";

type ReponseType =
  | {
      url: string;
    }
  | undefined;

export const useSelectPlanMutation = () => {
  return useMutation({
    mutationFn: async ({
      accessToken,
      data,
    }: {
      data: SelectPlanModel;
      accessToken: string;
    }): Promise<ReponseType> => {
      const res = await httpClient.request<ReponseType>({
        method: "POST",
        url: usersApi.PAYMENT,
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return res.data;
    },
  });
};
