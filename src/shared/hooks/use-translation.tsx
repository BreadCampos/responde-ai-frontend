import { Namespace } from "i18next";
import { useTranslation as useI18nTranslation } from "react-i18next";

export const useTranslation = <N extends Namespace>(ns?: N) => {
  return useI18nTranslation(ns);
};
