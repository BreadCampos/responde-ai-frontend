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

type SourceLink = {
  id: string;
  name: string | null;
  usageLimit: number;
  usageCount: number;
  isActive: boolean;
  createdAt: Date | null;
  token: string;
};

export type SurveyResponseModel = {
  id: string;
  surveyId: string;
  sourceLinkId: string | null;
  sourceLink: SourceLink | null;
  submittedAt: string;
  metrics: Metrics;
  genericLinkSlug: string | null;
  timeToSubmitSeconds: number | null;
  answers: unknown[];
};
