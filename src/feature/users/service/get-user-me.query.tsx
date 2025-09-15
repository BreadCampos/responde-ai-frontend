import { httpClient } from "@/core/api/fetch-api";
import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../api";

import type { UserModel } from "../model/user.model";

type ReponseType = UserModel | undefined;

export const GetUserMeServiceQuery = () => {
  const queryKey = ["user-me"];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await httpClient.request<ReponseType>({
        method: "GET",
        url: usersApi.ME,
      });
      return response.data;
    },
    refetchInterval: 1000 * 60 * 5, // 5 minutes
    retry: 0,
  });
};
