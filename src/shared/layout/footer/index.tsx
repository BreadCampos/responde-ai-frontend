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
        "w-full sm:max-h-[15px] p-4  border-t border-border text-center text-sm text-muted-foreground ",
        direction === "column"
          ? "flex flex-col"
          : "hidden sm:flex sm:flex-col  justify-center items-center"
      )}
    >
      <p className="text-xs text-muted-foreground">
        {t("footer.copyRight", {
          year: new Date().getFullYear(),
          company: "Responde Aí",
        })}
      </p>

      <a
        href="/terms"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-xs text-muted-foreground hover:underline",
          direction === "column"
            ? ""
            : "sm:absolute sm:right-4 sm:top-2 flex items-center justify-center mt-2 sm:mt-0"
        )}
      >
        {t("footer.termOfUse")}
      </a>
    </footer>
  );
};
