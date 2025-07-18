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
  console.log({ lang });
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children} </I18nextProvider>;
}
