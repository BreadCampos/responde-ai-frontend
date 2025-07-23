"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  signupWithCompanyResolver,
  type SignupWithCompanyFormValues,
} from "./register.schama";

import { RegisterCompanyForm } from "@/feature/company/components/register-company-form";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/button";
import { Stepper } from "@/shared/components/stepper";
import { Form } from "@/shared/components/ui/form";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useRegister } from "@/shared/hooks/use-register";
import { useTranslation } from "@/shared/hooks/use-translation";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { SelectPlanStep } from "../../components//select-plan";
import { RegisterUser } from "../../components/register-user";

const stepFields = [
  [
    "user.firstName",
    "user.lastName",
    "user.email",
    "user.password",
    "user.passwordConfirmation",
  ],
  [
    "company.legalName",
    "company.fantasyName",
    "company.document",
    "company.logoUrl",
    "company.addressLine",
    "company.theme.primary",
  ],
] as const;

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigation();

  const onBack = () => {
    navigate.back();
  };

  const methods = useForm({
    resolver: signupWithCompanyResolver,
    defaultValues: {
      company: {
        theme: {
          primary: "#387cec",
        },
      },
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 0) {
      onBack();
      return;
    }
    setCurrentStep((prev) => prev - 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const isLastStep = currentStep === stepFields.length - 1;

      if (isLastStep) {
        methods.handleSubmit(onSubmit)();
      } else {
        handleNextStep();
      }
    }
  };

  const { onRegister } = useRegister();
  const onSubmit = async (data: SignupWithCompanyFormValues) => {
    onRegister(data, methods.setError);
  };

  const { t } = useTranslation("login");
  const stepperSteps = [
    <RegisterUser key={"RegisterUser"} />,
    <RegisterCompanyForm
      key={"RegisterCompany"}
      title={t("register.company.title")}
    />,
    <SelectPlanStep key={"SelectPlan"} hasTestPlan />,
  ];

  const handleBack = () => {
    navigate.back();
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className="space-y-6"
      >
        <div className="flex mr-12">
          <Button
            onClick={handleBack}
            variant="ghost"
            size="icon"
            className={cn(
              "text-card-foreground",
              "absolute left-2 top-1/2 -translate-y-1/2",
              "md:static md:translate-y-0"
            )}
          >
            <ChevronLeft />
          </Button>
          <h1 className="text-2xl font-bold text-center w-full text-card-foreground">
            {t("register.title")}
          </h1>
        </div>

        <Stepper
          steps={stepperSteps}
          currentStep={currentStep}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
        />
      </form>
    </Form>
  );
};
