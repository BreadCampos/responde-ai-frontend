import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/shared/components/language-switcber";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import { Footer } from "@/shared/layout/footer";

export default function AuthFormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background max-h-[100vh] max-w-[100vw] overflow-hidden">
      <div
        className={cn(
          "relative p-6 bg-card text-card-foreground rounded-lg border border-border",
          "max-h-[90vh] overflow-y-auto overflow-x-none",
          "max-w-[90%] min:w:[300px] sm:min-w-[400px] md:min-w-[500px] lg:min-w-[600px]"
        )}
      >
        <div className="sm:absolute top-4 right-4 flex items-center gap-2 w-full sm:w-auto justify-center mb-4">
          <ThemeToggleButton />
          <LanguageSwitcher />
        </div>
        <div className="">{children}</div>
        <Footer direction="column" />
      </div>
    </div>
  );
}
