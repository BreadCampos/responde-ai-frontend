import { formatDate } from "@/shared/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import type { CompanyModel } from "../../model/company.model";

import { DefaultAvatar } from "@/shared/components/avatar";
import { useTranslation } from "@/shared/hooks/use-translation";

export const useColumns = () => {
  const { t } = useTranslation("surveys");
  const columns: ColumnDef<CompanyModel>[] = [
    {
      accessorKey: "logoUrl",
      size: 50,
      maxSize: 50,
      enableResizing: false,
      header: () => (
        <div className="text-left">{t("companies.columns.logoUrl")}</div>
      ),
      cell: ({ row }) => {
        const logoUrl = row.getValue("logoUrl") as string;
        const legalName = row.getValue("legalName") as string;
        return (
          <DefaultAvatar src={logoUrl} name={legalName} className={"size-10"} />
        );
      },
    },
    {
      accessorKey: "id",
      size: 35,
      maxSize: 35,
      enableResizing: false,
      header: () => (
        <div className="text-left">{t("companies.columns.id")}</div>
      ),
      cell: ({ row }) => {
        return <p className="max-w-[60px] truncate">{row.getValue("id")}</p>;
      },
    },
    {
      accessorKey: "document",
      size: 250,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("companies.columns.document")}</div>
      ),
    },
    {
      accessorKey: "fantasyName",
      size: 250,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("companies.columns.fantasyName")}</div>
      ),
    },
    {
      accessorKey: "legalName",
      size: 250,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("companies.columns.legalName")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      size: 150,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("companies.columns.createdAt")}</div>
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
