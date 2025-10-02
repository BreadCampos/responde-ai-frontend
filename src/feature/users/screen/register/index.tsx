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

export enum REGISTER_STEPPER_ENUM {
  USER = 0,
  COMPANY = 1,
  PLAN = 2,
}

const stepFields = {
  [0]: [
    "user.firstName",
    "user.lastName",
    "user.email",
    "user.password",
    "user.passwordConfirmation",
  ],
  [1]: [
    "company.legalName",
    "company.fantasyName",
    "company.document",
    "company.addressLine",
    "company.theme.primary",
    "company.logoLightFile",
    "company.logoDarkFile",
  ],
} as const;

export const Register = () => {
  const [currentStep, setCurrentStep] = useState<REGISTER_STEPPER_ENUM>(
    REGISTER_STEPPER_ENUM.USER
  );
  const navigate = useNavigation();

  const onBack = () => {
    navigate.back();
  };

  const methods = useForm({
    resolver: signupWithCompanyResolver,
    defaultValues: {
      company: {
        theme: {
          primary: "#2b7fff",
        },
      },
    },
  });

  const handleNextStep = async () => {
    if (currentStep in stepFields) {
      const fieldsToValidate =
        stepFields[currentStep as keyof typeof stepFields];
      const isValid = await methods.trigger(fieldsToValidate);

      if (isValid) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
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

      const isLastStep = currentStep === REGISTER_STEPPER_ENUM.PLAN;

      if (isLastStep) {
        methods.handleSubmit(onSubmit)();
      } else {
        handleNextStep();
      }
    }
  };

  const onChangeStep = (step: number) => {
    setCurrentStep(step);
  };

  const { onRegister } = useRegister({ onChangeStep });
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
        <div className="flex sm:mr-12 relative">
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
