import type { ColumnDef } from "@tanstack/react-table";
import type { WebhooksModel } from "../../model/webhooks.model";
import { formatDate } from "@/shared/ultils/format-date";
import { Badge } from "@/shared/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/shared/components/button";
import { CopyBadge } from "@/shared/components/copy.index";

interface CustomWebhookProps {
  setWebhookToEdit: (value: WebhooksModel) => void;
}
export const generateWebhookColumns: (
  vale: CustomWebhookProps
) => ColumnDef<WebhooksModel>[] = ({ setWebhookToEdit }) => [
  {
    accessorKey: "id",
    size: 100,
    maxSize: 100,
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
    cell: ({ row }) => {
      const url = row.original.url;
      return <CopyBadge textToCopy={url} className={"max-w-[200px]"} />;
    },
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
        <Badge variant={isActive ? "success" : "destructive"}>
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
    id: "actions",
    enableHiding: false,
    maxSize: 50,
    cell: ({ row }) => {
      const webhook = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                if (webhook) setWebhookToEdit(webhook);
              }}
            >
              Editar
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(webhook.url)}
            >
              Copiar URL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
