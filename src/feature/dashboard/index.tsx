"use client";
import { ROUTES } from "@/core/routes/route-constants";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useEffect } from "react";

export const Dashboard = () => {
  const navigate = useNavigation();

  useEffect(() => {
    navigate.push(ROUTES.SURVEY_LIST);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl text-foreground">Meu Dashboard</h1>
      <p className="text-muted-foreground">Bem-vindo de volta!</p>
    </div>
  );
};
