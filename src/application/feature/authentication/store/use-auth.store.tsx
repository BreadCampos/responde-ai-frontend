// src/application/stores/use-auth-store.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CompanyModel } from "../../company/model/company.mode";
import type { UserModel } from "../../users/model/user.model";
import { ROUTES } from "@/core/routes/route-constants";

interface AuthState {
  user: UserModel | null;
  company: CompanyModel | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (data: { user: UserModel }) => void;
  setCompany: (data: { company: CompanyModel }) => void;
  logout: () => void;
  setTokens: (tokens: { accessToken: string; refreshToken?: string }) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      company: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

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

      logout: async () => {
        await fetch("/api/auth/logout", { method: "POST" });

        set({
          user: null,
          company: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });

        window.location.href = ROUTES.LOGIN;
      },

      setTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          // refreshToken: tokens.refreshToken,
          isAuthenticated: !!tokens.accessToken,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
