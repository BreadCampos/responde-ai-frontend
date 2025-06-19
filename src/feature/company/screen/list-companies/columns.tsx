import type { ColumnDef } from "@tanstack/react-table";
import type { CompanyModel } from "../../model/company.mode";
import { DefaultAvatar } from "@/shared/components/avatar.index";
import { formatDate } from "@/shared/ultils/format-date";

export const columns: ColumnDef<CompanyModel>[] = [
  {
    accessorKey: "logoUrl",
    size: 50,
    maxSize: 50,
    enableResizing: false,
    header: () => <div className="text-left">Logo</div>,
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
    header: () => <div className="text-left">ID</div>,
    cell: ({ row }) => {
      return <p className="max-w-[60px] truncate">{row.getValue("id")}</p>;
    },
  },
  {
    accessorKey: "document",
    size: 250,
    enableResizing: true,
    header: () => <div className="text-left">Título</div>,
  },
  {
    accessorKey: "fantasyName",
    size: 250,
    enableResizing: true,
    header: () => <div className="text-left">Link</div>,
  },
  {
    accessorKey: "legalName",
    size: 250,
    enableResizing: true,
    header: () => <div className="text-left">Link</div>,
  },
  {
    accessorKey: "createdAt",
    size: 150,
    enableResizing: true,
    header: () => <div className="text-left">Criado em</div>,
    cell: ({ row }) => {
      return formatDate({
        date: row.getValue("createdAt"),
      });
    },
  },
];
