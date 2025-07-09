"use client";
import I18nProvider from "@/shared/providers/i18n.provider";

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return <I18nProvider lang={lang}>{children}</I18nProvider>;
}
