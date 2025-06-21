// src/app/modules/surveys/view/details-survey/components/nps-results.tsx

import { NpsData } from "@/feature/survey/model/survey.model";
import { NpsQuestionStats } from "./components/nps-question-stats";
import { Button } from "@/shared/components/button";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/components/ui/card";

interface Props {
  npsInfo?: NpsData[];
}

export const NpsSection = ({ npsInfo }: Props) => {
  const [isGridView, setIsGridView] = useState(false);
  if (!npsInfo || npsInfo.length === 0) {
    return null;
  }

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold tracking-tight">Resultados NPS</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsGridView((prev) => !prev)}
          className="hidden md:flex items-center gap-2"
        >
          {isGridView ? (
            <>
              <ArrowRight className="h-4 w-4" /> Ver em linha
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4" /> Ver em grade
            </>
          )}
        </Button>
      </div>

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
