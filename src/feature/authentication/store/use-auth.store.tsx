// src/application/stores/use-auth-store.ts
import { ROUTES } from "@/core/routes/route-constants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CompanyModel } from "../../company/model/company.model";
import type { UserModel } from "../../users/model/user.model";

interface AuthState {
  user: UserModel | null;
  company: CompanyModel | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  publicCompany: CompanyModel | null;
}

interface AuthActions {
  setUser: (data: { user: UserModel }) => void;
  setCompany: (data: { company: CompanyModel }) => void;
  logout: (navigate: AppRouterInstance) => void;
  setTokens: (tokens: { accessToken: string; refreshToken?: string }) => void;
  setPublicCompany: (data: { company: CompanyModel }) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      company: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      publicCompany: null,

      setUser: (data) => {
        set({
          user: data.user,
        });
      },

      setCompany: (data) => {
        set({
          company: data.company,
        });
      },

      logout: async (navigate) => {
        await fetch("/api/auth/logout", { method: "POST" });

        set({
          user: null,
          company: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });

        navigate.push(ROUTES.LOGIN);
      },

      setTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          // refreshToken: tokens.refreshToken,
          isAuthenticated: !!tokens.accessToken,
        });
      },

      setPublicCompany: (data) => {
        set({
          publicCompany: data.company,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
