"use client";

import i18n from "@/core/i18n";
import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

export default function I18nProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: string;
}) {
  console.log(lang);
  useEffect(() => {
    // Este efeito agora vai rodar sempre que o 'lang' da URL mudar.

    // Verificamos se o idioma atual do i18next é diferente do idioma da URL.
    if (i18n.language !== lang) {
      // Se for diferente, mandamos o i18next trocar para o idioma correto.
      i18n.changeLanguage(lang);
    }
  }, [lang]); // A dependência exclusiva no 'lang' é a chave.

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
