"use client";

import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { redirect } from "next/navigation";
import { use } from "react";
import { useTranslation } from "react-i18next";

export default function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);

  const { isAuthenticated } = useAuthStore();
  const { ready } = useTranslation();

  if (!ready) {
    return <>carregando.</>;
  }

  redirect(`/${lang}${isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}`);
}
