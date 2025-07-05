import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SurveyCustomLink } from "@/feature/survey/model/survey-custom-link";
import { Button } from "@/shared/components/button";
import { CopyBadge } from "@/shared/components/copy.index";
import { Badge } from "@/shared/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

interface CustomLinkColumnProps {
  setCustomLinkToEdit: (customLink: SurveyCustomLink) => void;
}
export const generateCustomLinkColumns: (
  vale: CustomLinkColumnProps
) => ColumnDef<SurveyCustomLink>[] = ({ setCustomLinkToEdit }) => [
  { accessorKey: "name", header: "Nome" },
  {
    accessorKey: "customLink",
    header: "Link",
    maxSize: 50,

    cell: ({ row }) => {
      const customLink = row.original.customLink;
      return <CopyBadge textToCopy={customLink} className={"max-w-[200px]"} />;
    },
  },
  {
    accessorKey: "usageCount",
    header: "Respostas",
    cell: ({ row }) => {
      const count = row.original.usageCount;
      return count > 0 ? (
        <Badge variant={"primary"}>{count}</Badge>
      ) : (
        "Nenhuma resposta"
      );
    },
  },
  {
    accessorKey: "usageLimit",
    header: "Limite",
    maxSize: 60,
    cell: ({ row }) => {
      return <Badge variant={"primary"}>{row.original.usageLimit}</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Data de Envio",
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString("pt-BR"),
  },
  {
    maxSize: 60,

    accessorKey: "isActive",
    header: "Ativo",

    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return isActive ? (
        <Badge variant={"success"}>Sim</Badge>
      ) : (
        <Badge variant={"destructive"}>Não</Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    maxSize: 50,
    cell: ({ row }) => {
      const customLink = row.original;
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
                if (customLink) setCustomLinkToEdit(customLink);
              }}
            >
              Editar
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(customLink.customLink)
              }
            >
              Copiar URL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
