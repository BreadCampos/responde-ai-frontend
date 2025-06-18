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
type ChartData = {
  name: string;
  respostas: number;
};

const mockChartData: ChartData[] = [
  { name: "01/06", respostas: 12 },
  { name: "02/06", respostas: 19 },
  { name: "03/06", respostas: 8 },
  { name: "04/06", respostas: 15 },
  { name: "05/06", respostas: 10 },
  { name: "06/06", respostas: 25 },
];
export const SurveyGraphic = () => {
  const chartData = mockChartData;
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#C7C8C9" fontSize={12} />
        <YAxis stroke="#C7C8C9" fontSize={12} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="respostas"
          stroke="var(--primary)"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
