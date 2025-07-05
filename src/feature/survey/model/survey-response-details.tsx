export type SurveyResponseDetailModel = {
  id: string;
  surveyId: string;
  sourceLinkId: string;
  submittedAt: string;
  metrics: Metrics;
  timeToSubmitSeconds?: number;
  answers: Answer[];
};

export type Answer = {
  questionId: string;
  value: string[] | number | string;
  question: Question;
};

export type Question = {
  id: string;
  surveyId: string;
  label: string;
  orderIndex: number;
  pageIndex: number;
  type: string;
  placeholder?: string;
  hint?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: Date;
  validations: Validation[];
  mask?: string[];
  selectOptions?: SelectOption[];
  conditional?: Conditional;
  ratingOptions?: RatingOptions;
};

export type RatingOptions = {
  max: number;
  min: number;
  style: string;
};

export type Conditional = {
  value: string;
  fieldId: string;
  operator: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export type Validation = {
  type: string;
  errorMessage?: string;
  options?: Options;
};

export type Options = {
  value: string;
};

export type Metrics = {
  os: Os;
  browser: Browser;
  language: string;
  deviceType: string;
  geoLocation?: unknown;
  ipAnonymized: string;
};

export type Browser = {
  name: string;
  version: string;
};

export type Os = {
  name: string;
};
