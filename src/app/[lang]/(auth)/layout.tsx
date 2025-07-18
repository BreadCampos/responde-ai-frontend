import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/shared/components/language-switcber";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";

export default function AuthFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex  items-center justify-center min-h-screen bg-background">
      <div
        className={cn(
          "relative min-w-md p-6 bg-card text-card-foreground rounded-lg border border-border",
          "max-h-[90vh] overflow-y-auto overflow-x-none"
        )}
      >
        <div className="absolute top-4 right-4 flex items-center gap-2 ">
          <ThemeToggleButton />
          <LanguageSwitcher />
        </div>
        <div className="">{children}</div>
      </div>
    </div>
  );
}
