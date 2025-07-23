"use client";

import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { SelectPlanStep } from "@/feature/users/components/select-plan";
import { Button } from "@/shared/components/button";
import EmblaCarousel from "@/shared/components/carrousel";
import { LanguageSwitcher } from "@/shared/components/language-switcber";
import { ThemeToggleButton } from "@/shared/components/theme-toggle-button";
import { Form } from "@/shared/components/ui/form";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useTranslation } from "@/shared/hooks/use-translation";
import { EmblaOptionsType } from "embla-carousel";
import { BarChart3, DollarSign, Target } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Trans } from "react-i18next";
import { FeatureCard } from "../../components/feature-card";
import { Step } from "../../components/step";

export default function HomePage() {
  const methods = useForm();
  const { t } = useTranslation("home");

  const navigate = useNavigation();
  const navigateToRegister = () => {
    navigate.push(ROUTES.REGISTER);
  };

  const navigateToLogin = () => {
    navigate.push(ROUTES.LOGIN);
  };
  const navigateToDashboard = useCallback(() => {
    navigate.push(ROUTES.DASHBOARD);
  }, [navigate]);

  const { isAuthenticated } = useAuthStore();
  const slideOptions: EmblaOptionsType = {
    axis: "y",
    dragFree: true,
    loop: true,
  };

  const images = [
    "/images/examples/nps-result.png",
    "/images/examples/custom-link.png",
    "/images/examples/graphic.png",
    "/images/examples/survey-response-all.png",
    "/images/examples/survey-response-details.png",
  ];

  const examplesSteps = images.map((image, index) => (
    <Image
      src={image}
      alt={""}
      key={index}
      fill={true}
      style={{ objectFit: "contain" }}
      quality={100}
    />
  ));
  useEffect(() => {
    if (isAuthenticated) {
      navigateToDashboard();
    }
  }, [isAuthenticated, navigateToDashboard]);

  const logoUrl = "/images/logo.svg";
  return (
    <div className="bg-background font-sans text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Image src={logoUrl} alt="Logo" width={30} height={30} />
            <span className="text-2xl font-bold text-foreground">
              Responde.ai
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-orange-500"
            >
              {t("header.nav.features")}
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-orange-500"
            >
              {t("header.nav.pricing")}
            </a>
            {/* <a
              href="#testimonials"
              className="text-muted-foreground hover:text-orange-500"
            >
              {t("header.nav.testimonials")}
            </a> */}
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            <LanguageSwitcher />
            <Button onClick={navigateToLogin}>{t("header.cta")}</Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 text-center">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight">
              <Trans
                i18nKey="hero.title"
                t={t}
                components={{
                  1: <span className="text-orange-500" />,
                }}
              />
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                className="w-full sm:w-auto px-8 py-3 text-lg"
                onClick={navigateToRegister}
              >
                {t("cta.startFree")}
              </Button>
              <a
                href="#features"
                className="font-semibold text-muted-foreground hover:text-orange-500"
              >
                {t("hero.viewFeatures")}
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground/80">
              {t("hero.noCreditCard")}
            </p>

            <div className="mt-10">
              <EmblaCarousel slides={examplesSteps} options={slideOptions} />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("features.title")}
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                {t("features.subtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Target size={32} />}
                title={t("features.card1.title")}
              >
                {t("features.card1.description")}
              </FeatureCard>
              <FeatureCard
                icon={<DollarSign size={32} />}
                title={t("features.card2.title")}
              >
                {t("features.card2.description")}
              </FeatureCard>
              <FeatureCard
                icon={<BarChart3 size={32} />}
                title={t("features.card3.title")}
              >
                {t("features.card3.description")}
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("howItWorks.title")}
              </h2>
            </div>
            <div className="max-w-2xl mx-auto space-y-12">
              <Step number="1" title={t("howItWorks.step1.title")}>
                {t("howItWorks.step1.description")}
              </Step>
              <Step number="2" title={t("howItWorks.step2.title")}>
                {t("howItWorks.step2.description")}
              </Step>
              <Step number="3" title={t("howItWorks.step3.title")}>
                {t("howItWorks.step3.description")}
              </Step>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("pricing.title")}
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                {t("pricing.subtitle")}
              </p>
            </div>
            <Form {...methods}>
              <SelectPlanStep
                hasTestPlan
                onClickButton={navigateToRegister}
                withOutTitle
              />
            </Form>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section id="testimonials" className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t("testimonials.title")}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground italic">
                    {t("testimonials.quote1")}
                  </p>
                  <div className="mt-4 flex items-center">
                    <DefaultAvatar name="testimonials.author1.name" />

                    <div className="ml-4">
                      <p className="font-semibold text-foreground">
                        {t("testimonials.author1.name")}
                      </p>
                      <p className="text-muted-foreground">
                        {t("testimonials.author1.role")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground italic">
                    {t("testimonials.quote2")}
                  </p>
                  <div className="mt-4 flex items-center">
                    <DefaultAvatar name="testimonials.author2.name" />

                    <div className="ml-4">
                      <p className="font-semibold text-foreground">
                        {t("testimonials.author2.name")}
                      </p>
                      <p className="text-muted-foreground">
                        {t("testimonials.author2.role")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Final CTA Section */}
        <section className="bg-orange-500">
          <div className="container mx-auto px-6 py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {t("finalCta.title")}
            </h2>
            <p className="mt-4 text-lg text-orange-100 max-w-2xl mx-auto">
              {t("finalCta.subtitle")}
            </p>
            <div className="mt-8">
              <Button
                className="bg-white text-orange-500 hover:bg-gray-100 px-10 py-4 text-xl"
                onClick={navigateToRegister}
              >
                {t("finalCta.button")}
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card text-card-foreground border-t">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl font-bold text-foreground">
                  Responde.ai
                </span>
              </div>
              <p className="text-muted-foreground">{t("footer.slogan")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">
                {t("footer.product.title")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("header.nav.features")}
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("header.nav.pricing")}
                  </a>
                </li>
                {/* <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.product.integrations")}
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">
                {t("footer.company.title")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    target="_blank"
                    href="https://wa.link/2jc0ug"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.company.about")}
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.link/2jc0ug"
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.company.contact")}
                  </a>
                </li>
                {/* <li>
                  <a
                    target="_blank"
                    href="https://wa.link/2jc0ug"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.company.blog")}
                  </a>
                </li> */}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">
                {t("footer.legal.title")}
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.legal.privacy")}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("footer.legal.terms")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-6 text-center text-muted-foreground/80">
            <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
