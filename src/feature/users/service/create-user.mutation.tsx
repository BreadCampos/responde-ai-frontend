import { httpClient } from "@/core/api/fetch-api";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { usersApi } from "../api";
import type { RegisterModel } from "../model/register.model";
import type { UserModel } from "../model/user.model";

type ReponseType =
  | {
      token: string;
      user: UserModel;
    }
  | undefined;

export const CreateUserMutation = () => {
  const { setTokens, setUser } = useAuthStore();
  const { t } = useTranslation("login");
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

        toast.success(t("register.toast.success"));
      }
    },
  });
};
