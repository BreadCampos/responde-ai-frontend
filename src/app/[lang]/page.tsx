"use client";

import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { redirect } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function HomePage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const { isAuthenticated } = useAuthStore();
  const { ready } = useTranslation();

  console.log({ isAuthenticated });

  if (!ready) {
    return <>carregando.</>;
  }

  redirect(`/${lang}${isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}`);
}
