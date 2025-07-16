"use client";

import { useTranslation } from "react-i18next";

export default function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // const { lang } = use(params);

  // const { isAuthenticated } = useAuthStore();
  const { ready } = useTranslation();

  if (!ready) {
    return <>carregando.</>;
  }

  // redirect(`/${lang}${isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}`);
}
