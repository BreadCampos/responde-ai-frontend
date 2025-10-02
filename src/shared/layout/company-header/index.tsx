import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { BackButton } from "@/shared/components/back-button";
import { CompanyLogo } from "@/shared/components/company-logo";
import { LanguageSwitcher } from "@/shared/components/language-switcber";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import { cn } from "@/shared/lib/utils";

export const CompanyHeader = () => {
  const { company, isAuthenticated } = useAuthStore();

  const renderImage = () => {
    return <CompanyLogo className="min-h-[64px] max-h-[64px] max-w-[200px]" />;
  };
  return (
    <header
      className={cn(
        "flex items-center  justify-between bg-card text-foreground shadow-md px-4 py-2 transition-all w-full h-[64px] ",
        company && "border-b-2 border-b-red-500"
      )}
    >
      {isAuthenticated ? (
        <BackButton>{renderImage()}</BackButton>
      ) : (
        renderImage()
      )}

      <div className="flex items-center   justify-end gap-2">
        <ThemeToggleButton />
        <LanguageSwitcher />
      </div>
    </header>
  );
};
