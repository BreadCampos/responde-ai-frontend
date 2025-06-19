"use client";

import * as React from "react";
import { Badge, type BadgeProps } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";
import { Copy, Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";

interface CopyBadgeProps extends BadgeProps {
  textToCopy: string;
  startText?: string;
  className?: string;
}

export const CopyBadge = ({
  textToCopy,
  startText,
  className,
  ...props
}: CopyBadgeProps) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const copyToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(textToCopy);
    setHasCopied(true);
  }, [textToCopy]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              "flex items-center gap-2 cursor-pointer transition-colors hover:bg-muted/80 max-w-[100%] truncate",
              className
            )}
            onClick={copyToClipboard}
            {...props}
          >
            {startText && <span className="font-semibold">{startText}</span>}

            <span className="flex-1 truncate min-w-0 font-mono text-xs text-muted-foreground">
              {textToCopy}
            </span>

            {hasCopied ? (
              <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
            ) : (
              <Copy className="h-3 w-3 flex-shrink-0" />
            )}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hasCopied ? "Copiado!" : "Copiar"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
