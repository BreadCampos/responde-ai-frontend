"use client";

import { ROUTES } from "@/core/routes/route-constants";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useEffect } from "react";
import { useAuthStore } from "../authentication/store/use-auth.store";

export const Dashboard = () => {
  const navigate = useNavigation();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate.push(ROUTES.SURVEY_LIST);
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl text-foreground">Meu Dashboard</h1>
      {/* ... */}
    </div>
  );
};
