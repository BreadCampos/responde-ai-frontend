import { Namespace } from "i18next";
import { useTranslation as useI18NextTranslation } from "react-i18next";

export const useTranslation = (ns?: Namespace) => {
  return useI18NextTranslation(ns);
};
