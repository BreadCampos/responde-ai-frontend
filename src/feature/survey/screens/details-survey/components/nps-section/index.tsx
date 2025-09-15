// src/app/modules/surveys/view/details-survey/components/nps-results.tsx

import { NpsData } from "@/feature/survey/model/survey.model";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/lib/utils";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NpsQuestionStats } from "./components/nps-question-stats";

interface Props {
  npsInfo?: NpsData[];
}

export const NpsSection = ({ npsInfo }: Props) => {
  const { t } = useTranslation("surveys");
  const [isGridView, setIsGridView] = useState(false);
  if (!npsInfo || npsInfo.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 items-center justify-between md:flex-row">
          {t("surveyDetails.nps.title")}{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsGridView((prev) => !prev)}
            className="hidden md:flex items-center gap-2"
          >
            {isGridView ? (
              <>
                <ArrowRight className="h-4 w-4" />{" "}
                {t("surveyDetails.nps.viewAsRow")}
              </>
            ) : (
              <>
                <LayoutGrid className="h-4 w-4" />{" "}
                {t("surveyDetails.nps.viewAsGrid")}
              </>
            )}
          </Button>
        </CardTitle>
        <CardDescription>{t("surveyDetails.nps.description")}</CardDescription>
      </CardHeader>

      <div
        className={cn("pb-4", "grid grid-cols-1 gap-4", {
          "md:grid md:grid-cols-2 xl:grid-cols-3": isGridView,
          "md:flex md:overflow-x-auto md:space-x-4 md:gap-0": !isGridView,
        })}
      >
        {npsInfo.map((npsItem) => (
          <div
            key={npsItem.questionId}
            className={cn({
              "md:w-[350px] md:flex-shrink-0": !isGridView,
            })}
          >
            <NpsQuestionStats data={npsItem} />
          </div>
        ))}
      </div>
    </Card>
  );
};
