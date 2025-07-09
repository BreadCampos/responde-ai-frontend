// app/[lang]/page.tsx

import { getTranslation } from "@/core/i18n/get-translations";
import { Locale } from "@/core/i18n/type/locale";

export default async function HomeTranslation({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const i18n = await getTranslation(lang, "common");

  return (
    <main>
      <h1>{i18n.t("welcome")}</h1>
      <p>{i18n.t("description")}</p>

      {/* Exemplo de componente cliente na mesma página */}
    </main>
  );
}
