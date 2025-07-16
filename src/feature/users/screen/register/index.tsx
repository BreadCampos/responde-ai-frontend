import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  signupWithCompanyResolver,
  type SignupWithCompanyFormValues,
} from "./register.schama";

import { RegisterCompanyForm } from "@/feature/company/components/register-company-form";
import { Stepper } from "@/shared/components/stepper";
import { Form } from "@/shared/components/ui/form";
import { useNavigation } from "@/shared/hooks/use-nagivation";
import { useRegister } from "@/shared/hooks/use-register";
import React from "react";
import { useTranslation } from "react-i18next";
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
      user: {
        email: "joao.campos@respondeai.com",
        firstName: "João Gabriel",
        lastName: "Campos",
        password: "qwe123QWE",
        passwordConfirmation: "qwe123QWE",
      },
      company: {
        addressLine: "Rua Exemplo, 123",
        document: "70.256.873/1602-32",
        fantasyName: "Empresa Exemplo",
        legalName: "Empresa Exemplo LTDA",

        logoUrl: "https://avatars.githubusercontent.com/u/62268075?s=96&v=4",
        settings: {
          always_display_logo: true,
        },
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
    <SelectPlanStep key={"SelectPlan"} />,
  ];

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className="space-y-6"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-card-foreground">
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
