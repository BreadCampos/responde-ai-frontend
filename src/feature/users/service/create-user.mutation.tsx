import { useMutation } from "@tanstack/react-query";
import type { RegisterModel } from "../model/register.model";
import { httpClient } from "@/core/api/fetch-api";
import { useAuthStore } from "../store/use-auth.store";
import { usersApi } from "../api";
import { toast } from "sonner";
import type { UserModel } from "../model/user.model";

type ReponseType =
  | {
      token: string;
      user: UserModel;
    }
  | undefined;

export const CreateUserMutation = () => {
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (data: RegisterModel): Promise<ReponseType> => {
      const res = await httpClient.request<ReponseType>({
        method: "POST",
        url: usersApi.REGISTER,
        body: data,
      });
      return res.data;
    },
    onSuccess: async (response) => {
      if (response?.token) {
        await setTokens({ accessToken: response.token, refreshToken: "" });
        await setUser({ user: response.user });

        toast.success("Cadastro realizado com sucesso");
      }
    },
  });
};
