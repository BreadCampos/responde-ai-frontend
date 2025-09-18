"use client";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/shared/hooks/use-translation";

interface Props {
  direction?: "row" | "column";
}
export const Footer = ({ direction = "row" }: Props) => {
  const { t } = useTranslation();
  return (
    <footer
      className={cn(
        "w-full p-4 bg-card border-t border-border text-center text-sm text-muted-foreground relative",
        direction === "column"
          ? "flex flex-col"
          : "flex flex-col sm:flex sm:flex-row justify-center items-center"
      )}
    >
      {t("footer.copyRight", {
        year: new Date().getFullYear(),
        company: "Responde Aí",
      })}

      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-xs text-muted-foreground hover:underline",
          direction === "column"
            ? ""
            : "sm:absolute sm:right-4 sm:top-5 flex items-center justify-center mt-2 sm:mt-0"
        )}
      >
        {t("footer.termOfUse")}
      </a>
    </footer>
  );
};
