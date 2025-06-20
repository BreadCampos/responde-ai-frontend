import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";

export const Header = () => {
  const { user, company } = useAuthStore();

  return (
    <header className="bg-card text-foreground shadow-md px-4 py-2 z-10 transition-all">
      <div className="flex items-center justify-end gap-2">
        <span className="text-card-foreground font-medium flex gap-2">
          {user?.firstName}
        </span>
        <span className="text-card-foreground font-medium ">
          {company?.fantasyName}
        </span>
        <ThemeToggleButton />
      </div>
    </header>
  );
};
