export type Ansewers = Array<{
  questionId: string;
  value: string | number | boolean | string[] | number[] | boolean[];
}>;

export type CreateSurveyResponse = {
  answers: Ansewers;
  timeToSubmitSeconds: number;
};
