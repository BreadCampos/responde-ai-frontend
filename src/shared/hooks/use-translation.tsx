import { Namespace } from "i18next";
import { useTranslation as useI18nTranslation } from "react-i18next";

// Seus namespaces padrão (está correto)
export const defaultNamespaces: Namespace = [
  "common",
  "login",
  "surveys",
  "company",
  "webhook",
];

export const useTranslation = <N extends Namespace>(ns?: N) => {
  const { t } = useI18nTranslation(ns);

  return t;
};
