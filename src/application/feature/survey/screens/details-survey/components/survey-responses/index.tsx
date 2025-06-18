import { DataTable } from "@/application/shared/components/data-table";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/application/shared/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";

type SurveyResponse = {
  id: string;
  submittedAt: string;
  content: string;
};

const mockResponses: SurveyResponse[] = [
  {
    id: "resp1",
    submittedAt: "2025-06-16T10:00:00Z",
    content: "O atendimento foi excelente!",
  },
  {
    id: "resp2",
    submittedAt: "2025-06-16T11:30:00Z",
    content: "Achei o produto um pouco caro.",
  },
  {
    id: "resp3",
    submittedAt: "2025-06-16T14:15:00Z",
    content: "Tudo perfeito, recomendo.",
  },
];

export const SurveyResponses = () => {
  const responses = mockResponses;

  const responseColumns: ColumnDef<SurveyResponse>[] = [
    { accessorKey: "content", header: "Resposta" },
    {
      accessorKey: "submittedAt",
      header: "Data de Envio",
      cell: ({ row }) =>
        new Date(row.original.submittedAt).toLocaleString("pt-BR"),
    },
  ];
  return (
    <>
      <CardHeader>
        <CardTitle>Todas as Respostas</CardTitle>
        <CardDescription>
          Visualize as respostas individuais recebidas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={responseColumns} data={responses} />
      </CardContent>
    </>
  );
};
