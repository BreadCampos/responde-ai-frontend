export type CreateSurveyResponse = {
  answers: Array<{
    questionId: string;
    value: string | number | boolean | string[] | number[] | boolean[];
  }>;
};
