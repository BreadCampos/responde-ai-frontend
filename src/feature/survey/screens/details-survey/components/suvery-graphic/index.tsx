import { SurveyResponsesOverTime } from "@/feature/survey/model/survey.model";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { formatDate } from "@/shared/ultils/format-date";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  chartData?: SurveyResponsesOverTime[];
}
export const SurveyGraphic = ({ chartData }: Props) => {
  const formattedData = chartData?.map((item) => ({
    name: formatDate({
      date: item.date,
      option: {
        dateStyle: "short",
        timeStyle: null,
      },
    }),
    respostas: item.count,
  }));
  return (
    <Card className="lg:col-span-4">
      <CardHeader>
        <CardTitle className="flex flex-col gap-2 items-center justify-between md:flex-row">
          Respostas ao longo do tempo
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2 overflow-auto">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="var(--primary)" fontSize={12} />
            <YAxis stroke="var(--primary)" fontSize={12} />
            <Tooltip
              labelStyle={{
                color: "var(--primary)",
                fontSize: "12px",
              }}
              contentStyle={{
                borderColor: "var(--primary)",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="respostas"
              stroke="var(--primary)"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>{" "}
      </CardContent>
    </Card>
  );
};
