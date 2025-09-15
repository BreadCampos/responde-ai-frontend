"use client";

import { Button } from "@/shared/components/button";
import { useTranslation } from "@/shared/hooks/use-translation";
import Link from "next/link";

export default function NotFound() {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-extrabold text-orange-500">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-foreground">
        {t("notFound.title", "Página Não Encontrada")}
      </h2>
      <p className="mt-2 text-lg text-muted-foreground">
        {t(
          "notFound.description",
          "Oops! A página que você está procurando não existe ou foi movida."
        )}
      </p>
      <Link href="/" className="mt-8">
        <Button>{t("notFound.cta", "Voltar para a Home")}</Button>
      </Link>
    </div>
  );
}
