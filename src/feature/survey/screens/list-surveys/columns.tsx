import type { ColumnDef } from "@tanstack/react-table";
import type { SurveyModel } from "../../model/survey.model";

export const columns: ColumnDef<SurveyModel>[] = [
  {
    accessorKey: "id",
    size: 35,
    maxSize: 35,
    enableResizing: false,
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      return <p className="max-w-[60px] truncate">{row.getValue("id")}</p>;
    },
  },
  {
    accessorKey: "title",
    size: 250,

    enableResizing: true,
    header: () => <div className="text-left">Título</div>,
  },
  {
    accessorKey: "genericLinkSlug",
    size: 250,
    enableResizing: true,
    header: () => <div className="text-left">Link</div>,
  },
];
