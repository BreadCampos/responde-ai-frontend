"use client";

import { ThemeProvider } from "@/shared/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
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
