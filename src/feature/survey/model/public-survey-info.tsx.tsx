import { CompanyModel } from "@/feature/company/model/company.model";
import { SurveyModel } from "./survey.model";

export type SurveyPublicInfoModel = {
  company: CompanyModel;
  survey: SurveyModel;
};
