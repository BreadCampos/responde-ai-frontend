import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useTranslation } from "@/shared/hooks/use-translation";
import { CheckIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
// Supondo o uso de uma biblioteca como 'react-i18next'

export type PlanID = "free" | "month" | "year";

export const SelectPlanStep = () => {
  const { watch, setValue, formState } = useFormContext();
  const { t } = useTranslation("login");

  const selectedPlan = watch("planId") as PlanID;

  const handleSelectPlan = (plan: PlanID) => {
    setValue("planId", plan, { shouldValidate: true });
  };

  const getCardClasses = (plan: PlanID) => {
    const baseClasses =
      "shad-card bg-gray-800/50 p-8 flex flex-col transition-all duration-200 ease-in-out";
    if (selectedPlan === plan) {
      return `${baseClasses} border-2 border-blue-600 transform lg:scale-105 shadow-2xl shadow-blue-800/20`;
    }
    return `${baseClasses} hover:-translate-y-1`;
  };

  const getButtonClasses = (plan: PlanID) => {
    const baseClasses = "mt-8 w-full shad-btn px-6 py-3 text-base";
    if (selectedPlan === plan) {
      return `${baseClasses} shad-btn-primary`;
    }
    return `${baseClasses} shad-btn-secondary`;
  };

  return (
    <div className="space-y-4">
      <header className="text-center mb-10">
        <h3 className="text-xl font-semibold">
          {t("register.plans.header.title")}
        </h3>
        <p className="text-muted-foreground mt-1">
          {t("register.plans.header.description")}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Avaliação Gratuita */}
        <Card className={getCardClasses("free")}>
          <CardHeader className="text-center">
            <CardTitle className="text-center text-xl font-semibold">
              {t("register.plans.free.title")}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t("register.plans.free.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center h-100">
            <div className="flex-1">
              <div className="mt-6">
                <span className="text-5xl font-extrabold text-card-foreground">
                  {t("register.plans.free.price")}
                </span>
              </div>
              <ul className="mt-8 flex-1 h-30 space-y-3 text-sm text-card-foreground flex-grow">
                <li className="flex items-center">
                  <span>
                    <strong>{t("register.plans.free.feature1_strong")}</strong>{" "}
                    {t("register.plans.free.feature1_rest")}
                  </span>
                </li>
              </ul>
            </div>

            <Button
              type="button"
              onClick={() => handleSelectPlan("free")}
              className={getButtonClasses("free")}
            >
              {t("register.plans.free.cta")}
            </Button>
          </CardContent>
        </Card>

        {/* Card 2: Mensal */}
        <Card className={cn(getCardClasses("month"), "relative")}>
          <CardHeader className="text-center">
            <CardTitle className="text-center text-xl font-semibold">
              {t("register.plans.month.title")}
              <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                <span className="shad-badge shad-btn-primary text-sm">
                  {t("register.plans.month.badge")}
                </span>
              </div>
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t("register.plans.month.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center h-100">
            <div className="flex-1">
              <div className="mt-6">
                <span className="text-5xl font-extrabold text-card-foreground">
                  {t("register.plans.month.price")}
                </span>
                <span className="text-xl font-medium text-muted-foreground">
                  {t("register.plans.month.perMonth")}
                </span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-card-foreground flex-grow">
                <li className="flex items-center pl-7">
                  <CheckIcon />
                  <span>
                    <strong>{t("register.plans.month.feature1_strong")}</strong>{" "}
                    {t("register.plans.month.feature1_rest")}
                  </span>
                </li>
                <li className="flex items-center pl-7">
                  <CheckIcon />
                  <span>
                    {t("register.plans.month.feature2_start")}{" "}
                    <strong>{t("register.plans.month.feature2_strong")}</strong>
                  </span>
                </li>
                <li className="flex items-center pl-7">
                  <CheckIcon />
                  <span>
                    <strong>{t("register.plans.month.feature3_strong")}</strong>{" "}
                    {t("register.plans.month.feature3_rest")}
                  </span>
                </li>
                <li className="flex items-center pl-7">
                  <CheckIcon />
                  <span>
                    <strong>{t("register.plans.month.feature4_strong")}</strong>{" "}
                    {t("register.plans.month.feature4_rest")}
                  </span>
                </li>
                <li className="flex items-center pl-7">
                  <CheckIcon />
                  <span>{t("register.plans.month.feature5")}</span>
                </li>
              </ul>
            </div>
            <Button
              type="button"
              onClick={() => handleSelectPlan("month")}
              className={getButtonClasses("month")}
            >
              {t("register.plans.month.cta")}
            </Button>
          </CardContent>
        </Card>

        {/* Card 3: Anual */}
        <Card className={cn(getCardClasses("year"), "relative")}>
          <CardHeader className="text-center">
            <CardTitle className="text-center text-xl font-semibold">
              {t("register.plans.year.title")}
              <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center ">
                <span className="shad-badge border px-2 rounded-full border-emerald-500/50 bg-emerald-900/50 text-emerald-300 text-xs">
                  {t("register.plans.year.badge")}
                </span>
              </div>
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t("register.plans.year.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center h-100">
            <div className="flex-1">
              <div className="mt-6">
                <span className="text-5xl font-extrabold text-card-foreground">
                  {t("register.plans.year.price")}
                </span>
                <span className="text-xl font-medium text-muted-foreground">
                  {t("register.plans.year.perMonth")}
                </span>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-card-foreground flex-grow">
                <li className="flex items-center">
                  <CheckIcon />
                  <span>{t("register.plans.year.feature1")}</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon />
                  <span>
                    {t("register.plans.year.feature2_start")}{" "}
                    <strong>{t("register.plans.year.feature2_strong")}</strong>
                  </span>
                </li>
              </ul>
            </div>

            <Button
              type="button"
              onClick={() => handleSelectPlan("year")}
              className={getButtonClasses("year")}
            >
              {t("register.plans.year.cta")}
            </Button>
          </CardContent>
        </Card>

        {formState?.errors?.planId?.message && (
          <div className="col-span-1 lg:col-span-3 text-destructive text-sm mt-2 text-center">
            {String(formState?.errors?.planId?.message) || ""}
          </div>
        )}
      </div>
    </div>
  );
};
