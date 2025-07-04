export const surveyApi = {
  CREATE_SURVEY: "/companies/:companyId/surveys",
  LIST_SURVEYS: "/companies/:companyId/surveys",
  GET_SURVEY: "/companies/:companyId/surveys/:surveyId",
  GET_PUBLIC_SURVEY_INFO: "/public/surveys/:surveyId",
  CREATE_PUBLIC_SURVEY_RESPONSE: "/public/surveys/:surveyId/responses",
  GET_SURVEY_RESPONSES: "/companies/:companyId/surveys/:surveyId/responses",
  GET_SURVEY_CUSTOM_LINK:
    "/companies/:companyId/surveys/:surveyId/custom-links",
};
