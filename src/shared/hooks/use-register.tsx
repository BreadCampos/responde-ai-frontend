/* eslint-disable @typescript-eslint/no-explicit-any */
import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useCreateCompanyMutation } from "@/feature/company/service/create-company.mutation";
import { useUploadCompanyLogoMutation } from "@/feature/company/service/upload-logo.mutation";
import { PlanID } from "@/feature/users/components/select-plan";
import {
  SignupWithCompanyFormValues,
  signupWithCompanySchema,
} from "@/feature/users/screen/register/register.schama";
import { CreateUserMutation } from "@/feature/users/service/create-user.mutation";
import { useSelectPlanMutation } from "@/feature/users/service/select-plan.mutation";
import { useEffect, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { useNavigation } from "./use-navigation";

interface Props {
  onChangeStep: (step: number) => void;
}
export const useRegister = ({ onChangeStep }: Props) => {
  const registerMutation = CreateUserMutation();
  const createCompanyMutation = useCreateCompanyMutation();
  const selectPlan = useSelectPlanMutation();
  const uploadLogoMutation = useUploadCompanyLogoMutation();

  const navigate = useNavigation();

  const [plan, setPlan] = useState<PlanID>();
  const [accessToken, setAccessToken] = useState<string>();

  const { user } = useAuthStore();

  const onRegister = async (
    data: SignupWithCompanyFormValues,
    setError: UseFormSetError<any>
  ) => {
    const finalValidation = signupWithCompanySchema.safeParse(data);
    if (!finalValidation.success) {
      finalValidation.error.errors.forEach((error) => {
        setError(error.path.join("."), {
          type: "manual",
          message: error.message,
        });
      });

      return;
    }

    const { user: userPayload, company: companyPayload } = finalValidation.data;
    const { logoLightFile, logoDarkFile, ...companyData } = companyPayload;

    try {
      const registerResponse = await registerMutation.mutateAsync(userPayload);

      const accessToken = registerResponse?.token;
      setPlan(data.planId as PlanID);
      setAccessToken(accessToken);

      if (!accessToken) {
        onChangeStep(0);
        return;
      }

      const formatDocument = {
        ...companyData,
        document: companyData.document.replace(/\D/g, ""),
      };

      const companyCreationResponse = await createCompanyMutation.mutateAsync({
        company: formatDocument,
        accessToken,
      });

      const companyId = companyCreationResponse?.id;

      if (companyId) {
        const uploadPromises = [];

        if (logoLightFile instanceof File) {
          uploadPromises.push(
            uploadLogoMutation.mutateAsync({
              companyId,
              variant: "light",
              logo: logoLightFile,
            })
          );
        }

        if (logoDarkFile instanceof File) {
          uploadPromises.push(
            uploadLogoMutation.mutateAsync({
              companyId,
              variant: "dark",
              logo: logoDarkFile,
            })
          );
        }

        if (uploadPromises.length > 0) {
          await Promise.all(uploadPromises);
        }
      }
    } catch (error: any) {
      console.error("Falha no processo de cadastro:", error);
    }
  };

  useEffect(() => {
    if (!createCompanyMutation.isSuccess || !plan || !user || !accessToken) {
      return;
    }

    if (plan === "free") {
      navigate.push(ROUTES.DASHBOARD);
    } else {
      selectPlan
        ?.mutateAsync({
          accessToken,
          data: {
            billingPeriod: plan,
          },
        })
        .then((data) => {
          if (data?.url) window.location.href = data?.url;
        });
    }
  }, [
    createCompanyMutation.isSuccess,
    accessToken,
    user,
    plan,
    navigate,
    selectPlan,
  ]);
  return { onRegister };
};
