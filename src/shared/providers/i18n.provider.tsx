import i18next from "@/core/i18n";
import { type ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18next}>{children}</I18nextProvider>;
}
