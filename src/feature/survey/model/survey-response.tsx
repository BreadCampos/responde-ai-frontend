export type SurveyReponseModel = {
  id: string;
  surveyId: string;
  sourceLinkId: string | null;
  submittedAt: string;
  metrics: {
    os: {
      name: string;
      version: string;
    };
    browser: {
      name: string;
      version: string;
    };
    language: string;
    deviceType: string;
    geoLocation: unknown | null;
    ipAnonymized: string | null;
  };
  timeToSubmitSeconds: number | null;
  answers: unknown[];
};
