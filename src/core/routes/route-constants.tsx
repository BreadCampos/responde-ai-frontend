export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/",
  SURVEY_LIST: "/surveys",
  SURVEY_CREATE: "/surveys/create",
  SURVEY_DETAILS: "/surveys/details/:id",
  SURVEY_RESPONSE_DETAILS:
    "/surveys/details/:surveyId/answers/:surveyResponseId",
  SURVEY_RESPONSE: "/s/:id",
  COMPANY_LIST: "/companies",
  COMPANY_CREATE: "/companies/create",
  COMPANY_EDIT: "/companies/edit/:id",
  COMPANY_DETAILS: "/companies/details/:id",
  WEBHOOKS_LIST: "/webhooks",
  WEBHOOKS_DETAILS: "/webhooks/details/:id",
  LOGOUT: "/logout",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
