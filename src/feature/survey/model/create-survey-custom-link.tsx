export type CustomLinkModal = {
  surveyId: string;
  companyId: string;
  customLinkPayload: {
    isActive: boolean;
    name: string;
    usageLimit: number;
  };
};
