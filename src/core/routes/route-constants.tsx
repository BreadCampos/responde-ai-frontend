export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
  SURVEY_LIST: "/surveys",
  SURVEY_CREATE: "/surveys/create",
  SURVEY_DETAILS: "/surveys/details/:id",
  SURVEY_RESPONSE: "/surveys/:id/response/",
  COMPANY_LIST: "/companies",
  COMPANY_CREATE: "/companies/create",
  COMPANY_EDIT: "/companies/edit/:id",
  COMPANY_DETAILS: "/companies/details/:id",
  WEBHOOKS_LIST: "/webhooks",
  LOGOUT: "/logout",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
