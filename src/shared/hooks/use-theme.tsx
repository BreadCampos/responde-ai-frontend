import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { oklch } from "culori";
import { useContext, useMemo } from "react";
import { ThemeProviderContext } from "../components/theme-provider";
import { convertToOklchValues } from "../utils/convert-to-oklch-values";

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  const { company, publicCompany } = useAuthStore();

  const getLogoSrc = (
    companyData: {
      logoUrl?: string | null;
      darkLogoUrl?: string | null;
    } | null,
    theme: string | undefined
  ): string | undefined => {
    const lightLogo = companyData?.logoUrl;
    const darkLogo = companyData?.darkLogoUrl;

    if (!lightLogo && !darkLogo) {
      return "/favicon.svg";
    }

    if (theme === "light") {
      return lightLogo || darkLogo || undefined;
    }
    return darkLogo || lightLogo || undefined;
  };

  const logoSrc = useMemo(
    () => getLogoSrc(company, context?.theme),
    [context?.theme, company]
  );

  const publicLogoSrc = useMemo(
    () => getLogoSrc(publicCompany, context?.theme),
    [context?.theme, publicCompany]
  );

  const setCompanyTheme = (primaryColor = "2b7fff") => {
    const primaryOklch = convertToOklchValues(primaryColor);

    document.documentElement.style.setProperty(
      "--primary",
      `oklch(${primaryOklch})`
    );

    const oklchColor = oklch(primaryColor);
    const foregroundColor =
      oklchColor && oklchColor.l < 0.6
        ? "oklch(0.98 0.02 260)"
        : "oklch(0.2 0.03 265)";

    document.documentElement.style.setProperty(
      "--primary-foreground",
      foregroundColor
    );
  };

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return { ...context, logoSrc, publicLogoSrc, setCompanyTheme };
};
