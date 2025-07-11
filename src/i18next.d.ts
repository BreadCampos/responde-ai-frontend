import "react-i18next";
import type common from "../public/locales/pt-BR/common.json";
import type company from "../public/locales/pt-BR/company.json";
import type login from "../public/locales/pt-BR/login.json";
import type surveys from "../public/locales/pt-BR/surveys.json";
import type webhook from "../public/locales/pt-BR/webhook.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";

    resources: {
      common: typeof common;
      login: typeof login;
      surveys: typeof surveys;
      company: typeof company;
      webhook: typeof webhook;
    };
  }
}
