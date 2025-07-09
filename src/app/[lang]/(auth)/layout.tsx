import { LanguageSwitcher } from "@/shared/components/language-switcber";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import type { ReactNode } from "react";
interface Props {
  children: ReactNode;
  lang?: string;
}

const AuthFormLayout = ({ children }: Props) => {
  return (
    <div className="flex bg-reg-500 items-center justify-center min-h-screen bg-background">
      <div className="relative w-full max-w-md p-6 bg-card text-card-foreground rounded-lg border border-border">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <ThemeToggleButton />
          <LanguageSwitcher />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthFormLayout;
