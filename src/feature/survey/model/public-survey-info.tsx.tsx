import { CompanyModel } from "@/feature/company/model/company.mode";
import { SurveyModel } from "./survey.model";

export type SurveyPublicInfoModel = {
  company: CompanyModel;
  survey: SurveyModel;
};
