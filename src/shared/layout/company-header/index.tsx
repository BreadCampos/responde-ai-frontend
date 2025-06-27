import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { BackButton } from "@/shared/components/back-button";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import { cn } from "@/shared/lib/utils";

export const CompanyHeader = () => {
  const { company, publicCompany } = useAuthStore();

  return (
    <header
      className={cn(
        "flex items-center  justify-between bg-card text-foreground shadow-md px-4 py-2 transition-all w-full h-[50px]",
        company && "border-b-2 border-b-red-500"
      )}
    >
      {company?.fantasyName ? (
        <BackButton>
          <h3 className="text-card-foreground"> {company?.legalName}</h3>
        </BackButton>
      ) : (
        <h3 className="text-card-foreground"> {publicCompany?.legalName}</h3>
      )}

      <div className="flex items-center justify-end gap-2">
        <ThemeToggleButton />
      </div>
    </header>
  );
};
