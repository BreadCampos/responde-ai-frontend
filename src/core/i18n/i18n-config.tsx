export const i18nConfig = {
  locales: ["pt-BR", "en-US"],
  defaultLocale: "pt-BR",
} as const;

export type Locale = (typeof i18nConfig)["locales"][number];
