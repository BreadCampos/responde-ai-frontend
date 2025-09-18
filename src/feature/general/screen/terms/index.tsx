"use client";

import { Separator } from "@/shared/components/ui/separator";
import { useTranslation } from "@/shared/hooks/use-translation";

export const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
        {t("termsOfUsePage.title")}
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-10">
        {t("termsOfUsePage.lastUpdate")}
      </p>

      <div className="prose dark:prose-invert prose-p:leading-relaxed prose-li:leading-relaxed space-y-8 text-muted-foreground">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.introduction.heading")}
          </h2>
          <p className="mb-2">{t("termsOfUsePage.introduction.p1")}</p>
          <p className="mb-2">{t("termsOfUsePage.introduction.p2")}</p>
          <p className="mb-2">{t("termsOfUsePage.introduction.p3")}</p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.serviceDescription.heading")}
          </h2>
          <p className="mb-2">{t("termsOfUsePage.serviceDescription.p1")}</p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.userAccountsResponsibilities.heading")}
          </h2>
          <p className="mb-2">
            {t("termsOfUsePage.userAccountsResponsibilities.p1")}
          </p>
          <p className="mb-2">
            {t("termsOfUsePage.userAccountsResponsibilities.p2")}
          </p>
          <p className="mb-2">
            {t("termsOfUsePage.userAccountsResponsibilities.p3")}
          </p>
          <p className="mb-2">
            {t("termsOfUsePage.userAccountsResponsibilities.p4")}
          </p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.intellectualProperty.heading")}
          </h2>
          <p className="mb-2">{t("termsOfUsePage.intellectualProperty.p1")}</p>
          <p className="mb-2">{t("termsOfUsePage.intellectualProperty.p2")}</p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.plansPaymentsCancellation.heading")}
          </h2>
          <p className="mb-2">
            {t("termsOfUsePage.plansPaymentsCancellation.p1")}
          </p>
          <p className="mb-2">
            {t("termsOfUsePage.plansPaymentsCancellation.p2")}
          </p>
          <p className="mb-2">
            {t("termsOfUsePage.plansPaymentsCancellation.p3")}
          </p>
          <p className="mb-2">
            {t("termsOfUsePage.plansPaymentsCancellation.p4")}
          </p>
          <p className="mb-2">
            {t("termsOfUsePage.plansPaymentsCancellation.p5")}
          </p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.privacyDataProtection.heading")}
          </h2>
          <p className="mb-2">{t("termsOfUsePage.privacyDataProtection.p1")}</p>
          <p className="mb-2">{t("termsOfUsePage.privacyDataProtection.p2")}</p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.limitationOfLiability.heading")}
          </h2>
          <p className="mb-2">{t("termsOfUsePage.limitationOfLiability.p1")}</p>
          <p className="mb-2">{t("termsOfUsePage.limitationOfLiability.p2")}</p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.termination.heading")}
          </h2>
          <p className="mb-2">{t("termsOfUsePage.termination.p1")}</p>
          <p className="mb-2">{t("termsOfUsePage.termination.p2")}</p>
        </div>
        <Separator />

        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
            {t("termsOfUsePage.generalProvisions.heading")}
          </h2>
          <p className="mb-2">{t("termsOfUsePage.generalProvisions.p1")}</p>
          <p className="mb-2">{t("termsOfUsePage.generalProvisions.p2")}</p>
          <p className="mb-2">{t("termsOfUsePage.generalProvisions.p3")}</p>
        </div>
      </div>
    </div>
  );
};
