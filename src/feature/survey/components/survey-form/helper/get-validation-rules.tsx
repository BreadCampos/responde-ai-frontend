/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useValidationRules.ts

import type { QuestionValidators } from "@/feature/survey/model/survey.model";
import { useTranslation } from "@/shared/hooks/use-translation";
import { isValidCNPJ } from "@/shared/utils/valid-cnpj";
import { isValidCPF } from "@/shared/utils/valid-cpf";
import { useMemo } from "react";
import type { RegisterOptions } from "react-hook-form";

type ValidationResult = {
  rules: RegisterOptions;
  inputProps: Record<string, any>;
};

/**
 * Hook customizado para gerar regras de validação e props de input
 * para o react-hook-form, utilizando traduções de i18n.
 * @param validations - Array de objetos validadores.
 * @returns Um objeto contendo `rules` para react-hook-form e `inputProps` para o elemento de input.
 */
export const useValidationRules = (
  validations: Array<QuestionValidators>
): ValidationResult => {
  const { t } = useTranslation("common");

  const validationResult = useMemo<ValidationResult>(() => {
    if (!validations || validations.length === 0) {
      return { rules: {}, inputProps: {} };
    }

    const rules: RegisterOptions = {};
    const inputProps: Record<string, any> = {};

    for (const validator of validations) {
      const value = validator.options?.value;
      const customMessage = validator.errorMessage;

      switch (validator.type) {
        case "required":
          rules.required = customMessage || t("validations.required");
          break;

        case "min_length":
          rules.minLength = {
            value: Number(value),
            message:
              customMessage || t("validations.min_length", { number: value }),
          };
          break;

        case "max_length":
          rules.maxLength = {
            value: Number(value),
            message:
              customMessage || t("validations.max_length", { number: value }),
          };
          inputProps.maxLength = value;
          break;

        case "min":
          rules.min = {
            value: Number(value),
            message: customMessage || t("validations.min", { number: value }),
          };
          inputProps.min = value;
          break;

        case "max":
          rules.max = {
            value: Number(value),
            message: customMessage || t("validations.max", { number: value }),
          };
          inputProps.max = value;
          break;

        case "email":
          rules.pattern = {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: customMessage || t("validations.email"),
          };
          break;

        case "cpf":
          rules.validate = {
            isValidCPF: (cpf: string) =>
              isValidCPF(cpf) || customMessage || t("validations.cpf"),
          };
          break;

        case "cnpj":
          rules.validate = {
            isValidCNPJ: (cnpj: string) =>
              isValidCNPJ(cnpj) || customMessage || t("validations.cnpj"),
          };
          break;

        case "custom":
          if (validator.regex) {
            rules.pattern = {
              value: new RegExp(validator.regex),
              message: customMessage || t("validations.custom"),
            };
          }
          break;
      }
    }

    return { rules, inputProps };
  }, [validations, t]);

  return validationResult;
};
