/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  signupWithCompanyResolver,
  signupWithCompanySchema,
  type SignupWithCompanyFormValues,
} from "./register.schama";

import { RegisterCompanyForm } from "@/feature/company/components/register-company-form";
import { useCreateCompanyMutation } from "@/feature/company/service/create-company.mutation";
import { Stepper } from "@/shared/components/stepper";
import { Form } from "@/shared/components/ui/form";
import { useNavigation } from "@/shared/hooks/use-nagivation";
import React from "react";
import { toast } from "sonner";
import { RegisterUser } from "../../components/register-user";
import { CreateUserMutation } from "../../service/create-user.mutation";

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
  const registerMutation = CreateUserMutation();
  const createCompanyMutation = useCreateCompanyMutation();
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

  const onSubmit = async (data: SignupWithCompanyFormValues) => {
    const finalValidation = signupWithCompanySchema.safeParse(data);
    if (!finalValidation.success) {
      finalValidation.error.errors.forEach((error) => {
        methods.setError(error.path.join(".") as any, {
          type: "manual",

          message: error.message,
        });
      });

      return;
    }

    const { user: userPayload, company: companyPayload } = finalValidation.data;

    try {
      const registerResponse = await registerMutation.mutateAsync(userPayload);

      const accessToken = registerResponse?.token;

      if (!accessToken) {
        toast.error("Não foi possível obter o token de autenticação.");
        return;
      }

      const formatDocument = {
        ...companyPayload,
        document: companyPayload.document.replace(/\D/g, ""),
      };

      await createCompanyMutation.mutateAsync({
        company: formatDocument,
        accessToken,
      });
    } catch (error: any) {
      console.error("Falha no processo de cadastro:", error);
      toast.error(error.message || "Não foi possível concluir o cadastro.");
    }
  };

  const stepperSteps = [
    <RegisterUser key={"RegisterUser"} />,
    <RegisterCompanyForm
      key={"RegisterCompany"}
      title={"2. Dados da Empresa"}
    />,
  ];

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        onKeyDown={handleKeyDown}
        className="space-y-6"
      >
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-card-foreground">Registrar</h1>
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
