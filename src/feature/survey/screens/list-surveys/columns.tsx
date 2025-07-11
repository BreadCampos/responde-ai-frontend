import { CopyBadge } from "@/shared/components/copy.index";
import { useTranslation } from "@/shared/hooks/use-translation";
import { formatDate } from "@/shared/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import type { SurveyModel } from "../../model/survey.model";

export const useColumns = () => {
  const t = useTranslation("surveys");
  const columns: ColumnDef<SurveyModel>[] = [
    {
      accessorKey: "id",
      size: 35,
      maxSize: 35,
      enableResizing: false,
      header: () => <div className="text-left">{t("surveys.columns.id")}</div>,
      cell: ({ row }) => {
        return <p className="max-w-[60px] truncate">{row.getValue("id")}</p>;
      },
    },
    {
      accessorKey: "title",
      size: 250,

      enableResizing: true,
      header: () => (
        <div className="text-left">{t("surveys.columns.title")}</div>
      ),
    },
    {
      accessorKey: "genericLinkSlug",
      size: 200,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("surveys.columns.link")}</div>
      ),
      cell: ({ row }) => {
        const genericLinkSlug = row.original.genericLinkSlug;
        return (
          <CopyBadge textToCopy={genericLinkSlug} className={"max-w-[200px]"} />
        );
      },
    },
    {
      accessorKey: "createdAt",
      size: 150,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("surveys.columns.createdAt")}</div>
      ),
      cell: ({ row }) => {
        return formatDate({
          date: row.getValue("createdAt"),
        });
      },
    },
  ];
  return { columns };
};
