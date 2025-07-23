// src/core/i18n/settings.ts

export const fallbackLng = "pt-BR";
export const languages = [fallbackLng, "en-US"];
export const defaultNS = "common";

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
