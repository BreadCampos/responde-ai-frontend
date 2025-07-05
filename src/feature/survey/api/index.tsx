export const surveyApi = {
  CREATE_SURVEY: "/companies/:companyId/surveys",
  LIST_SURVEYS: "/companies/:companyId/surveys",
  GET_SURVEY: "/companies/:companyId/surveys/:surveyId",
  GET_PUBLIC_SURVEY_INFO: "/public/surveys/:surveyId",
  CREATE_PUBLIC_SURVEY_RESPONSE: "/public/surveys/:surveyId/responses",
  GET_SURVEY_RESPONSES: "/companies/:companyId/surveys/:surveyId/responses",
  CREATE_SURVEY_CUSTOM_LINK:
    "/companies/:companyId/surveys/:surveyId/custom-links",
  GET_SURVEY_CUSTOM_LINK:
    "/companies/:companyId/surveys/:surveyId/custom-links",
  UPDATE_SURVEY_CUSTOM_LINK:
    "/companies/:companyId/surveys/:surveyId/custom-links/:customLinkId",
  GET_SURVEY_RESPONSE_DETAILS:
    "/companies/:companyId/surveys/:surveyId/responses/:surveyResponseId",
};
