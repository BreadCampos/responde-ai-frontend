import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { BackButton } from "@/shared/components/back-button";
import { LanguageSwitcher } from "@/shared/components/language-switcber";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

export const CompanyHeader = () => {
  const { company, publicCompany, isAuthenticated } = useAuthStore();

  const renderImage = (image?: string) => {
    if (!image) return null;
    return (
      <Image
        src={image}
        alt="Logo"
        width={54}
        height={54}
        className="object-cover rounded-lg"
        unoptimized
        loading="lazy"
      />
    );
  };
  return (
    <header
      className={cn(
        "flex items-center  justify-between bg-card text-foreground shadow-md px-4 py-2 transition-all w-full h-[64px] ",
        company && "border-b-2 border-b-red-500"
      )}
    >
      {isAuthenticated ? (
        <BackButton>
          <h3 className="text-card-foreground">
            {" "}
            {renderImage(company?.logoUrl)}
          </h3>{" "}
        </BackButton>
      ) : (
        <h3 className="text-card-foreground">
          {" "}
          {renderImage(publicCompany?.logoUrl)}
        </h3>
      )}

      <div className="flex items-center   justify-end gap-2">
        <ThemeToggleButton />
        <LanguageSwitcher />
      </div>
    </header>
  );
};
