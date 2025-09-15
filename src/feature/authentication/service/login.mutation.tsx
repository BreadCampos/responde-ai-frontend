import { useMutation, useQueryClient } from "@tanstack/react-query";

import { httpClient } from "@/core/api/fetch-api";
import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { toast } from "sonner";
import type { UserModel } from "../../users/model/user.model";
import { authenticationApi } from "../api";
import type { LoginEntity } from "../entities/login.entities";

type ResponseType =
  | {
      token: string;
      user: UserModel;
    }
  | undefined;

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigation();
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginEntity): Promise<ResponseType> => {
      const res = await httpClient.request<ResponseType>({
        method: "POST",
        url: authenticationApi.LOGIN,
        body: data,
      });
      return res.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["companies", "user-me"] });
      if (response?.token) {
        setTokens({ accessToken: response.token, refreshToken: "" });
        setUser({ user: response?.user });
        navigate?.push(ROUTES.DASHBOARD);
        toast.success(`Bem-vindo, ${response?.user?.firstName || "usuário"}!`);
      }
    },
  });
};
