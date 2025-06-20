"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { BackButton } from "@/shared/components/back-button";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { GetSurveyQuery } from "../../service/get-survey.query";

import { SurveyGraphic } from "./components/suvery-graphic";
import { SurveyLinks } from "./components/survey-links";
import { SurveyResponses } from "./components/survey-responses";
import { SurveyCustomLinks } from "./components/survey-custom-link";
import { SurveyPreviewDrawer } from "./components/questions-drawer";

interface Props {
  surveyId: string;
}
export const DetailsSurvey = ({ surveyId }: Props) => {
  const { company } = useAuthStore();

  const { data: survey } = GetSurveyQuery({
    companyId: company?.id || "",
    surveyId: surveyId || "",
  });

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-muted/40 rounded-lg">
      <div className="flex items-start space-y-2">
        <BackButton className="w-full flex items-start gap-2">
          <h2 className="text-3xl flex-1 font-bold tracking-tight text-card-foreground">
            {survey?.title}
          </h2>
          <SurveyPreviewDrawer survey={survey} />{" "}
        </BackButton>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Respostas ao longo do tempo</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <SurveyGraphic />
          </CardContent>
        </Card>

        <Card className="p-4 flex flex-col items-center justify-center text-center h-full lg:col-span-3 space-y-4">
          <SurveyLinks genericLinkSlug={survey?.genericLinkSlug} />
        </Card>
      </div>

      <Card>
        <SurveyResponses surveyId={surveyId} />
      </Card>

      <Card>
        <SurveyCustomLinks />
      </Card>
    </main>
  );
};
