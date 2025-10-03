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
  const { setTokens, setCompany, setPublicCompany, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginEntity): Promise<ResponseType> => {
      const res = await httpClient.request<ResponseType>({
        method: "POST",
        url: authenticationApi.LOGIN,
        body: data,
      });
      return res.data;
    },
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ["company-list"] });
      await queryClient.invalidateQueries({ queryKey: ["user-me"] });
      await queryClient.invalidateQueries({ queryKey: ["survey-list"] });

      if (response?.token) {
        setTokens({ accessToken: response.token, refreshToken: "" });
        setPublicCompany({ company: null });
        setCompany({ company: null });
        setUser({ user: response?.user });
        navigate?.push(ROUTES.DASHBOARD);
        toast.success(`Bem-vindo, ${response?.user?.firstName || "usuário"}!`);
      }
    },
  });
};
// jg -> a7d8b6e9-00a5-4aa8-ac93-0c8642d79a3a
// logo -> f3e752ca-dd5e-489f-ac8a-f7405a37d349
