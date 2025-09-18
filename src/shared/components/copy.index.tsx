"use client";

import { Badge, type BadgeProps } from "@/shared/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";
import { Check, Copy, Eye, EyeOff } from "lucide-react"; // Import Eye and EyeOff icons
import * as React from "react";

// Add the optional 'secret' prop to the interface
interface CopyBadgeProps extends BadgeProps {
  textToCopy?: string;
  startText?: string;
  className?: string;
  secret?: boolean;
}

export const CopyBadge = ({
  textToCopy,
  startText,
  className,
  secret = false,
  ...props
}: CopyBadgeProps) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  const [isSecretVisible, setIsSecretVisible] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const copyToClipboard = React.useCallback(() => {
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setHasCopied(true);
    }
  }, [textToCopy]);

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSecretVisible((prev) => !prev);
  };

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
              {secret && !isSecretVisible ? "••••••••••••••••" : textToCopy}
            </span>

            {secret && (
              <span
                onClick={toggleVisibility}
                className="flex-shrink-0"
                aria-label={isSecretVisible ? "Hide value" : "Show value"}
              >
                {isSecretVisible ? (
                  <EyeOff className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
              </span>
            )}

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
