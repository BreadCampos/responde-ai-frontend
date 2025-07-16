import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import type { CompanyModel } from "@/feature/company/model/company.model";
import { GetCompaniesListQuery } from "@/feature/company/service/get-companies-list.query";
import { GetUserMeServiceQuery } from "@/feature/users/service/get-user-me.query";
import { useNavigation } from "@/shared/hooks/use-nagivation";
import { oklch } from "culori";
import { useEffect } from "react";
import { convertToOklchValues } from "../utils/convert-to-oklch-values";

export const useGetUserAndCompany = () => {
  const {
    user: userFromStore,
    company: companyFromStore,
    setCompany,
    setUser,
    logout,
  } = useAuthStore();
  const navigate = useNavigation();

  const { data: user, isLoading, isError } = GetUserMeServiceQuery();

  const { data: company } = GetCompaniesListQuery({
    pagination: {
      ignorePagination: true,
    },
    enabled: !!user,
  });

  const setCompanyTheme = (currentCompany: CompanyModel) => {
    if (currentCompany.theme && currentCompany.theme.primary) {
      const primaryOklch = convertToOklchValues(currentCompany.theme.primary);

      document.documentElement.style.setProperty(
        "--primary",
        `oklch(${primaryOklch})`
      );

      const oklchColor = oklch(currentCompany.theme.primary);
      const foregroundColor =
        oklchColor && oklchColor.l < 0.6
          ? "oklch(0.98 0.02 260)"
          : "oklch(0.2 0.03 265)";

      document.documentElement.style.setProperty(
        "--primary-foreground",
        foregroundColor
      );
    }
  };
  useEffect(() => {
    if (!isLoading && isError) {
      console.error(
        "Sessão inválida ou expirada. Redirecionando para o login."
      );

      const handleLogout = async () => {
        logout(navigate);
      };

      handleLogout();
      return;
    }

    if (user && JSON.stringify(user) !== JSON.stringify(userFromStore)) {
      setUser({ user });
    }

    if (company && company.data?.length > 0) {
      const currentCompany = company.data[0];
      if (currentCompany.id !== companyFromStore?.id) {
        setCompany({ company: currentCompany });
        setCompanyTheme(currentCompany);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, company, isLoading, isError, userFromStore, companyFromStore]);
};
