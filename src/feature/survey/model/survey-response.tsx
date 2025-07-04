export type Metrics = {
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

export type SurveyReponseModel = {
  id: string;
  surveyId: string;
  sourceLinkId: string | null;
  submittedAt: string;
  metrics: Metrics;
  timeToSubmitSeconds: number | null;
  answers: unknown[];
};
