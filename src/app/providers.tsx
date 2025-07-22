"use client";

import "@/core/i18n/index";
import { ThemeProvider } from "@/shared/components/theme-provider";
import { I18nProvider } from "@/shared/providers/i18n.provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          <Toaster richColors closeButton={true} />

          {children}
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
