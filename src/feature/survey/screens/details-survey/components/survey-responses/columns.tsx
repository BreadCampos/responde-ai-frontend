import { SurveyResponseModel } from "@/feature/survey/model/survey-response";
import { ColumnDef } from "@tanstack/react-table";

export const responseColumns: ColumnDef<SurveyResponseModel>[] = [
  { accessorKey: "id", header: "Id" },
  {
    accessorKey: "sourceLinkId",
    header: "Link",
    cell: ({ row }) => {
      return row.original.sourceLink
        ? row.original.sourceLink.name
        : row.original.sourceLinkId;
    },
  },
  { accessorKey: "responsesOverTime.count", header: "Tempo de Resposta (s)" },
  {
    accessorKey: "submittedAt",
    header: "Data de Envio",
    cell: ({ row }) =>
      new Date(row.original.submittedAt).toLocaleString("pt-BR"),
  },
];
