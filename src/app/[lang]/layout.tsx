import I18nProvider from "@/shared/providers/i18n.provider";
import { use } from "react";

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);

  return <I18nProvider lang={lang}>{children}</I18nProvider>;
}
