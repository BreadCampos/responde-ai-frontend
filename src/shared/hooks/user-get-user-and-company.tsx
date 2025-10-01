"use client";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { GetCompaniesListQuery } from "@/feature/company/service/get-companies-list.query";
import { GetUserMeServiceQuery } from "@/feature/users/service/get-user-me.query";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useEffect } from "react";
import { deepCompare } from "../utils/deep-compare";
import { useTheme } from "./use-theme";

export const useGetUserAndCompany = () => {
  const {
    user: userFromStore,
    company: companyFromStore,
    setCompany,
    setUser,
    logout,
  } = useAuthStore();

  const { setCompanyTheme } = useTheme();
  const navigate = useNavigation();
  const { data: user, isLoading, isError } = GetUserMeServiceQuery();

  const { data: companiesResult } = GetCompaniesListQuery({
    enabled: !!user,
    pagination: { ignorePagination: true },
  });

  useEffect(() => {
    if (isError && !isLoading) {
      logout();
      return;
    }

    if (user && JSON.stringify(user) !== JSON.stringify(userFromStore)) {
      setUser({ user });
    }

    const firstCompany = companiesResult?.data?.[0] || null;
    setCompanyTheme(
      firstCompany?.theme.primary || companyFromStore?.theme.primary
    );
    if (!firstCompany || deepCompare(firstCompany, companyFromStore)) {
      return;
    }

    console.log(firstCompany);
    setCompany({ company: firstCompany });
  }, [
    user,
    setCompanyTheme,
    isLoading,
    companiesResult,
    isError,
    userFromStore,
    companyFromStore,
    logout,
    navigate,
    setCompany,
    setUser,
  ]);
};
