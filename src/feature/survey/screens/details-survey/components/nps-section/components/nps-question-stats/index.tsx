import { NpsData } from "@/feature/survey/model/survey.model";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import {} from "recharts";

interface Props {
  data: NpsData;
}

export const NpsQuestionStats = ({ data }: Props) => {
  const total = data.totalResponses || 1;

  const promoterPercent = (data.promoters / total) * 100;
  const passivePercent = (data.passives / total) * 100;
  const detractorPercent = (data.detractors / total) * 100;

  const getNpsScoreColor = (score: number) => {
    if (score >= 50) return "text-green-500";
    if (score > 0) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CardHeader className="text-center line-clamp-2">
              {data.questionText}
            </CardHeader>
          </TooltipTrigger>
          <TooltipContent>{data.questionText}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CardContent className="space-y-4">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Pontuação NPS
          </p>
          <p className={cn("text-5xl font-bold", getNpsScoreColor(data.nps))}>
            {data.nps}
          </p>
          <p className="text-xs text-muted-foreground">
            Baseado em {data.totalResponses} respostas
          </p>
        </div>

        <div>
          <div className="flex h-3 w-full rounded-full overflow-hidden">
            <div
              className="bg-green-500"
              style={{ width: `${promoterPercent}%` }}
              title={`Promotores: ${promoterPercent.toFixed(1)}%`}
            />
            <div
              className="bg-yellow-500"
              style={{ width: `${passivePercent}%` }}
              title={`Passivos: ${passivePercent.toFixed(1)}%`}
            />
            <div
              className="bg-red-500"
              style={{ width: `${detractorPercent}%` }}
              title={`Detratores: ${detractorPercent.toFixed(1)}%`}
            />
          </div>
        </div>

        <div className="text-sm space-y-1 text-card-foreground">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span>Promotores</span>
            </div>
            <span className="font-medium">
              {data.promoters} ({promoterPercent.toFixed(0)}%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-yellow-500" />
              <span>Passivos</span>
            </div>
            <span className="font-medium">
              {data.passives} ({passivePercent.toFixed(0)}%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              <span>Detratores</span>
            </div>
            <span className="font-medium">
              {data.detractors} ({detractorPercent.toFixed(0)}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
