import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/shared/components/button";
import { CopyBadge } from "@/shared/components/copy.index";
import { Badge } from "@/shared/components/ui/badge";
import { formatDate } from "@/shared/utils/format-date";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { WebhooksModel } from "../../model/webhooks.model";

import { useTranslation } from "@/shared/hooks/use-translation";

interface Props {
  setWebhookToEdit: (value: WebhooksModel) => void;
}
export const useColumns = ({ setWebhookToEdit }: Props) => {
  const { t } = useTranslation("webhook");
  const columns: ColumnDef<WebhooksModel>[] = [
    {
      accessorKey: "id",
      size: 100,
      maxSize: 100,
      enableResizing: false,
      header: () => <div className="text-left">{t("webhooks.columns.id")}</div>,
      cell: ({ row }) => {
        return <p className="max-w-[60px] truncate">{row.getValue("id")}</p>;
      },
    },
    {
      accessorKey: "url",
      size: 250,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("webhooks.columns.url")}</div>
      ),
      cell: ({ row }) => {
        const url = row.original.url;
        return <CopyBadge textToCopy={url} className={"max-w-[200px]"} />;
      },
    },
    {
      accessorKey: "maxRetries",
      size: 250,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("webhooks.columns.maxRetries")}</div>
      ),
    },
    {
      accessorKey: "isActive",
      size: 250,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("webhooks.columns.isActive")}</div>
      ),
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
      header: () => (
        <div className="text-left">{t("webhooks.columns.retryPolicy")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      size: 150,
      enableResizing: true,
      header: () => (
        <div className="text-left">{t("webhooks.columns.createdAt")}</div>
      ),
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
                <span className="sr-only">
                  {t("webhooks.columns.actions.label")}
                </span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  if (webhook) setWebhookToEdit(webhook);
                }}
              >
                {t("webhooks.columns.actions.edit")}
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(webhook.url)}
              >
                {t("webhooks.columns.actions.copyUrl")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return { columns };
};
