// Em app/not-found.tsx

"use client"; // Passo 1: Transformar em um Client Component

import { Button } from "@/shared/components/button";
import { useTranslation } from "@/shared/hooks/use-translation"; // Passo 2: Importar seu hook
import Link from "next/link";

export default function NotFound() {
  // Passo 3: Usar o hook para carregar as traduções
  const { t } = useTranslation("common"); // Use o namespace onde estão seus textos de 404

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
