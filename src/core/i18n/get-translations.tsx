import { createInstance } from "i18next";
import "server-only";
import { i18nConfig } from "./i18n-config"; // Ajuste o caminho

export async function getTranslation(lng: string, ns: string = "common") {
  const i18nInstance = createInstance();
  await i18nInstance.init({
    lng,
    ns,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    resources: {
      [lng]: {
        [ns]: (
          await import(`../../../public/locales/${lng}/${ns}.json`)
        ).default,
      },
    },
  });
  return { t: i18nInstance.t };
}
