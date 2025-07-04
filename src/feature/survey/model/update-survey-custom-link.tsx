export type UpdateCustomLinkModel = {
  surveyId: string;
  companyId: string;
  customLinkId: string;
  customLinkPayload: {
    isActive: boolean;
    name: string;
    usageLimit: number;
  };
};
