"use client";

import { BackButton } from "@/shared/components/back-button";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { GetSurveyQuery } from "../../service/get-survey.query";

import { SurveyGraphic } from "./components/suvery-graphic";
import { SurveyLinks } from "./components/survey-links";
import { SurveyResponses } from "./components/survey-responses";
// import { SurveyCustomLinks } from "./components/survey-custom-link";
import { SurveyPreviewDrawer } from "./components/questions-drawer";
import { cn } from "@/shared/lib/utils";
import { NpsSection } from "./components/nps-section";
import { SurveyCustomLinks } from "./components/survey-custom-link";

interface Props {
  surveyId: string;
}
const DetailsSurvey = ({ surveyId }: Props) => {
  const { company } = useAuthStore();

  const { data: survey } = GetSurveyQuery({
    companyId: company?.id || "",
    surveyId: surveyId || "",
  });

  return (
    <main
      className={cn(
        "flex-1 space-y-2 p-2 pt-6 bg-muted/40 rounded-lg",
        "md:p-4"
      )}
    >
      <div className="mb-5 w-full flex flex-col md:flex-row md:justify-between items-center gap-3">
        <BackButton>
          <h2 className="text-2xl flex-1 font-bold tracking-tight text-card-foreground">
            {survey?.title}
          </h2>
        </BackButton>
        <SurveyPreviewDrawer survey={survey} />{" "}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <SurveyGraphic chartData={survey?.responsesOverTime} />
        <SurveyLinks genericLinkSlug={survey?.genericLinkSlug} />
      </div>
      <SurveyResponses />
      {survey?.npsInfo && <NpsSection npsInfo={survey?.npsInfo} />}

      <SurveyCustomLinks />
    </main>
  );
};

export default DetailsSurvey;
