"use client";
import I18nProvider from "@/shared/providers/i18n.provider";

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <I18nProvider>{children}</I18nProvider>;
}
