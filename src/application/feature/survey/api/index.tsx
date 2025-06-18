import type { ApiUrl } from "@/core/api/types";

export const surveyApi: ApiUrl = {
  CREATE_SURVEY: "/companies/:companyId/surveys",
  LIST_SURVEYS: "/companies/:companyId/surveys",
  GET_SURVEY: "/companies/:companyId/surveys/:surveyId",
};
