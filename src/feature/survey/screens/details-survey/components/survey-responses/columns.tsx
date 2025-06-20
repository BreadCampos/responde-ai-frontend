import { SurveyReponseModel } from "@/feature/survey/model/survey-response";
import { ColumnDef } from "@tanstack/react-table";

export const responseColumns: ColumnDef<SurveyReponseModel>[] = [
  { accessorKey: "id", header: "Id" },
  { accessorKey: "sourceLinkId", header: "Link" },
  { accessorKey: "timeToSubmitSeconds", header: "Tempo de Resposta (s)" },
  {
    accessorKey: "submittedAt",
    header: "Data de Envio",
    cell: ({ row }) =>
      new Date(row.original.submittedAt).toLocaleString("pt-BR"),
  },
];
