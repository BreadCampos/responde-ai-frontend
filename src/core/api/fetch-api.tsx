"use client";
import { APP_ENV } from "@/env";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { toast } from "sonner";
import {
  UnauthorizedError,
  type HttpRequest,
  type HttpResponse,
} from "./types";

class HttpClient {
  private readonly baseUrl?: string = APP_ENV.API_URL;

  private readonly refreshTokenKey: string = "REFRESH_TOKEN";
  private readonly tokenKey: string = "AUTH_TOKEN";

  async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
    const token = useAuthStore.getState().accessToken;

    const headers: Record<string, string> = {
      "accept-language": "pt-BR",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method: data.method,
      headers: { ...headers, ...data.headers },
    };

    if (data.body) {
      if (data.body instanceof FormData) {
        config.body = data.body;

        const finalHeaders = new Headers(config.headers);
        finalHeaders.delete("Content-Type");
        config.headers = finalHeaders;
      } else {
        config.body = JSON.stringify(data.body);
        const finalHeaders = new Headers(config.headers);
        if (!finalHeaders.has("Content-Type")) {
          finalHeaders.set("Content-Type", "application/json");
        }
        config.headers = finalHeaders;
      }
    }

    const response = await fetch(`${this.baseUrl}${data.url}`, config);

    if (response.status === 204) {
      return { status: response.status, data: undefined };
    }

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    if (!response.ok) {
      if (responseData?.error?.code === "ExpiredTokenException") {
        const refreshedResponse = await this.handleRefreshToken<T>(data);
        return refreshedResponse;
      }

      if (response.status === 401) {
        this.clearAuthTokens();
        toast.error(responseData?.message || "Ocorreu um erro na requisição");
        throw new UnauthorizedError();
      }

      const message = Array.isArray(responseData?.message)
        ? responseData?.message?.[0]
        : responseData?.message;

      toast.error(message || "Ocorreu um erro na requisição");
    }

    return { status: response.status, data: responseData };
  }

  private async handleRefreshToken<T>(
    originalRequest: HttpRequest
  ): Promise<HttpResponse<T>> {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      this.clearAuthTokens();
      throw new UnauthorizedError();
    }

    try {
      const refreshResponse = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const refreshData = await refreshResponse.json();

      if (!refreshResponse.ok) {
        throw new Error("Falha ao renovar a sessão");
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        refreshData;

      localStorage.setItem(this.tokenKey, newAccessToken);
      localStorage.setItem(this.refreshTokenKey, newRefreshToken);

      return this.request<T>(originalRequest);
    } catch {
      this.clearAuthTokens();
      throw new UnauthorizedError();
    }
  }

  private clearAuthTokens() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}

export const httpClient = new HttpClient();
