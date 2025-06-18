"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/application/shared/components/theme-provider";
import { Toaster } from "sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster richColors closeButton={true} />

        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
