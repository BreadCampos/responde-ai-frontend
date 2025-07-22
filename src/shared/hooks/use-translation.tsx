import { useTranslation as useI18NextTranslation } from "react-i18next";

export const useTranslation = (ns?: string) => {
  const t = useI18NextTranslation(ns);
  return t;
};
