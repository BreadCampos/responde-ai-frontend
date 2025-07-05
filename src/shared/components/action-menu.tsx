// components/ui/action-menu.tsx

import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type MenuOption = {
  label: string;
  onSelect: () => void;
  className?: string;
  disabled?: boolean;
  withSeparator?: true;
};

interface ActionMenuProps {
  options: MenuOption[];
  title?: string;
  trigger?: React.ReactNode;
  buttonText?: string;
}

export function ActionMenu({
  options,
  title,
  buttonText = "Abrir menu",
  trigger,
}: ActionMenuProps) {
  const defaultTrigger = (
    <Button variant="ghost" className="h-8 w-8 p-0">
      <span className="sr-only">{buttonText}</span>
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger || defaultTrigger}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {title && <DropdownMenuLabel>{title}</DropdownMenuLabel>}
        {options.map((option, index) => {
          if ("type" in option && option.type === "separator") {
            // Verifica se a opção é um separador
            return;
          }

          // Renderiza um item de menu padrão
          return (
            <>
              <DropdownMenuItem
                key={index}
                onSelect={option.onSelect}
                disabled={option.disabled}
                className={option.className}
              >
                {option.label}
              </DropdownMenuItem>
              {option.withSeparator && <DropdownMenuSeparator key={index} />}
            </>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
