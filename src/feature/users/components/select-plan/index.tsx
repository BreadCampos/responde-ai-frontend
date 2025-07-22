import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useTranslation } from "@/shared/hooks/use-translation";
import { CheckCircle2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export type PlanID = "free" | "month" | "year";

interface Prpos {
  hasTestPlan?: boolean;
  onClickButton?: () => void;
}
export const SelectPlanStep = ({ hasTestPlan, onClickButton }: Prpos) => {
  const { watch, setValue, formState } = useFormContext();
  const { t } = useTranslation("login");

  const selectedPlan = watch("planId") as PlanID;

  const handleSelectPlan = (plan: PlanID) => {
    if (onClickButton) {
      return onClickButton();
    }
    setValue("planId", plan, { shouldValidate: true });
  };

  const getCardClasses = (plan: PlanID) => {
    const baseClasses =
      "shad-card bg-card p-4 flex w-full flex-col transition-all duration-200 ease-in-out h-full";
    if (selectedPlan === plan) {
      return `${baseClasses} border-2  transform lg:scale-105 shadow-2xl`;
    }
    return `${baseClasses} hover:-translate-y-1`;
  };

  const getButtonClasses = (plan: PlanID) => {
    const baseClasses = "mt-4 w-full shad-btn px-6 py-3 text-base";
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

      <div
        className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-6",
          hasTestPlan && "lg:grid-cols-3"
        )}
      >
        {/* Card 1: Avaliação Gratuita */}
        {hasTestPlan && (
          <Card className={cn(getCardClasses("free"))}>
            <CardHeader className="text-center">
              <CardTitle className="text-center text-xl font-semibold">
                {t("register.plans.free.title")}
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                {t("register.plans.free.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 text-center">
              <div className="flex-1">
                <div className="mt-3">
                  <span className="text-5xl font-extrabold text-card-foreground">
                    {t("register.plans.free.price")}
                  </span>
                </div>
                <p className="mt-8 text-sm text-card-foreground">
                  {t("register.plans.free.feature1_strong")}
                </p>
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
        )}
        {/* Card 2: Mensal */}
        <Card className={cn(getCardClasses("month"))}>
          <CardHeader className="text-center items-center">
            <CardTitle className="text-center text-xl font-semibold">
              {t("register.plans.month.title")}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t("register.plans.month.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 items-center">
            <div className="flex-1 w-full">
              <div className="mt-3 text-center">
                <span className="text-5xl font-extrabold text-card-foreground">
                  {t("register.plans.month.price")}
                </span>
                <span className="text-xl font-medium text-muted-foreground">
                  {t("register.plans.month.perMonth")}
                </span>
              </div>
              <div className="flex align-center justify-center mt-2">
                <Badge className="bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider">
                  {t("register.plans.month.badge")}
                </Badge>
              </div>
              <ul className="mt-8 space-y-3 text-sm text-card-foreground text-left w-full">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  <span>{t("register.plans.month.feature1_strong")}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  <span>
                    Formulários e respostas{" "}
                    <strong>{t("register.plans.month.feature2_strong")}</strong>
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  <span>
                    <strong>{t("register.plans.month.feature3_strong")}</strong>{" "}
                    para integração com qualquer API
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  <span>
                    <strong>{t("register.plans.month.feature4_strong")}</strong>{" "}
                    para suas pesquisas
                  </span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
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
        <Card className={cn(getCardClasses("year"))}>
          <CardHeader className="text-center items-center">
            <CardTitle className="text-center text-xl font-semibold">
              {t("register.plans.year.title")}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {t("register.plans.year.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-1 items-center">
            <div className="flex-1 w-full  rounded-lg p-6 flex flex-col text-white">
              <div className="text-center">
                <span className="text-5xl font-extrabold text-card-foreground">
                  {t("register.plans.year.price")}
                </span>
                <span className="text-xl font-medium text-muted-foreground">
                  {t("register.plans.year.perMonth")}
                </span>
              </div>

              <div className="flex align-center justify-center mt-2">
                <Badge variant={"success"}>
                  {t("register.plans.year.badge")}
                </Badge>
              </div>

              <ul className="mt-8 space-y-3 text-sm text-card-foreground text-left w-full">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                  <span>{t("register.plans.year.feature1")}</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
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
