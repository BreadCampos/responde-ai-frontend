"use client";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { BackButton } from "@/shared/components/back-button";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { GetSurveyQuery } from "../../service/get-survey.query";

import { ROUTES } from "@/core/routes/route-constants";
import { ActionMenu, MenuOption } from "@/shared/components/action-menu";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import EmbedCode from "./components/embed-code";
import { NpsSection } from "./components/nps-section";
import { SurveyPreviewDrawer } from "./components/questions-drawer";
import { SurveyCustomLinks } from "./components/survey-custom-link";
import { SurveyLinks } from "./components/survey-links";
import { SurveyResponses } from "./components/survey-responses";
import { SurveyGraphic } from "./components/suvery-graphic";

interface Props {
  surveyId: string;
}
const DetailsSurvey = ({ surveyId }: Props) => {
  const { company } = useAuthStore();

  const { data: survey } = GetSurveyQuery({
    companyId: company?.id || "",
    surveyId: surveyId || "",
  });

  const navigate = useNavigation();

  const optionsMenu: MenuOption[] = [
    {
      label: "Editar questionário",
      onSelect() {
        navigate.push(ROUTES.SURVEY_UPDATE.replace(":id", surveyId));
      },
    },
  ];

  return (
    <main
      className={cn(
        "flex-1 space-y-2 p-2 pt-6 bg-muted/40 rounded-lg",
        "md:p-4"
      )}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row justify-between  items-center gap-4">
            <BackButton>
              <h2 className="text-2xl flex-1 font-bold tracking-tight text-card-foreground">
                {survey?.title}
              </h2>
            </BackButton>
            <div className="flex items-center gap-2">
              <SurveyPreviewDrawer survey={survey} />{" "}
              <ActionMenu options={optionsMenu} />
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          <SurveyGraphic chartData={survey?.responsesOverTime} />
          <SurveyLinks genericLinkSlug={survey?.genericLinkSlug} />
        </div>
        <SurveyResponses />
        {survey?.npsInfo && <NpsSection npsInfo={survey?.npsInfo} />}
        <SurveyCustomLinks />
        <EmbedCode />
      </div>
    </main>
  );
};

export default DetailsSurvey;
