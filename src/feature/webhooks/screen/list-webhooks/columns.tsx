import type { ColumnDef } from "@tanstack/react-table";
import type { WebhooksModel } from "../../model/webhooks.model";
import { formatDate } from "@/shared/ultils/format-date";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/ultils/cn";
import { UpdateWebhooksModal } from "./components/update-webhooks-modal";

export const columns: ColumnDef<WebhooksModel>[] = [
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
    accessorKey: "url",
    size: 250,
    enableResizing: true,
    header: () => <div className="text-left">Url</div>,
  },
  {
    accessorKey: "maxRetries",
    size: 250,
    enableResizing: true,
    header: () => <div className="text-left">Tentativas</div>,
  },
  {
    accessorKey: "isActive",
    size: 250,
    enableResizing: true,
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");
      return (
        <Badge
          variant={isActive ? "default" : "destructive"}
          className={cn(
            "text-sm w-fit",
            "font-semibold",
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}
        >
          {isActive ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "retryPolicy",
    size: 150,
    enableResizing: true,
    header: () => <div className="text-left">Política de Retentativa</div>,
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
  {
    accessorKey: "action",
    size: 100,
    enableResizing: false,
    header: () => <div className="text-left">Ação</div>,
    cell: ({ row }) => {
      const webhookCompleto = row.original;
      return <UpdateWebhooksModal webhook={webhookCompleto} />;
    },
  },
];
