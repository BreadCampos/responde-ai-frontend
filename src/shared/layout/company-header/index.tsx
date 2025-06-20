import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";

export const CompanyHeader = () => {
  const { company } = useAuthStore();

  // const url = company?.logoUrl || "/logo.svg";
  return (
    <header className="flex items-center  justify-between bg-card text-foreground shadow-md px-4 py-2 transition-all w-full h-[50px]">
      <h3 className="text-card-foreground"> {company?.legalName}</h3>
      {/* <Image src={url} alt="Company Logo" width={76} height={76} unoptimized /> */}
      <div className="flex items-center justify-end gap-2">
        <ThemeToggleButton />
      </div>
    </header>
  );
};
