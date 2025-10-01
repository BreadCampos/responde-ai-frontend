"use client";

import { ROUTES } from "@/core/routes/route-constants";
import { cn } from "@/lib/utils";
import { BackButton } from "@/shared/components/back-button";
import { Button } from "@/shared/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Form } from "@/shared/components/ui/form";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useTranslation } from "@/shared/hooks/use-translation";
import { formatDocument } from "@/shared/utils/format-cpf";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { RegisterCompanyForm } from "../../components/register-company-form";
import { GetCompanyQuery } from "../../service/get-company.query";
import { useUpdateCompanyMutation } from "../../service/update-company.mutation";
import { useUploadCompanyLogoMutation } from "../../service/upload-logo.mutation";
import {
  UpdateCompanyFormValues,
  UpdateCompanyResolver,
} from "./update-company.schema";

export const UpdateCompany = () => {
  const methods = useForm<UpdateCompanyFormValues>({
    resolver: UpdateCompanyResolver,
  });
  const { reset, handleSubmit } = methods;
  const { id } = useParams<{ id: string }>();
  const { data: company, isLoading: isLoadingCompany } = GetCompanyQuery({
    id,
  });

  const { t } = useTranslation("company");
  const { isPending: isUpdatingCompany, mutateAsync: updateCompany } =
    useUpdateCompanyMutation();
  const { isPending: isUploadingLogo, mutateAsync: uploadLogoMutation } =
    useUploadCompanyLogoMutation();

  const navigate = useNavigation();
  const onSubmit = async (data: UpdateCompanyFormValues) => {
    try {
      const { logoLightFile, logoDarkFile, ...companyTextData } = data.company;

      const updatedCompany = await updateCompany({
        id: id,
        company: {
          ...companyTextData,
          document: companyTextData.document.replace(/\D/g, ""),
        },
      });

      const companyId = updatedCompany?.id;
      if (!companyId) {
        return;
      }

      const uploadPromises = [];
      if (logoLightFile instanceof File) {
        uploadPromises.push(
          uploadLogoMutation({
            companyId,
            variant: "light",
            logo: logoLightFile,
          })
        );
      }
      if (logoDarkFile instanceof File) {
        uploadPromises.push(
          uploadLogoMutation({ companyId, variant: "dark", logo: logoDarkFile })
        );
      }

      if (uploadPromises.length > 0) {
        await Promise.all(uploadPromises);
      }

      toast.success(t("update.successMessage"));
      navigate.push(ROUTES.COMPANY_DETAILS.replace(":id", companyId));
    } catch (error) {
      console.error("Falha no processo de atualização:", error);
    }
  };

  const loading = isUpdatingCompany || isUploadingLogo || isLoadingCompany;

  useEffect(() => {
    if (!company) {
      return;
    }

    const formattedCompany = {
      ...company,
      document: formatDocument(company.document),
    };
    console.log({ formattedCompany });
    reset({ company: formattedCompany });
  }, [company, reset]);

  return (
    <main
      className={cn(
        "flex-1 space-y-2 p-2 pt-6 h-full bg-muted/40  rounded-lg flex flex-col items-center justify-start",
        "md:p-4"
      )}
    >
      <Card className="min-w-[600px] overflow-auto w-3/5">
        <CardHeader className="space-y-2">
          <CardTitle className="text-1xl flex flex-col gap-2 items-center justify-between md:flex-row">
            <BackButton>{t("update.title")}</BackButton>
          </CardTitle>
          <CardDescription>{}</CardDescription>
        </CardHeader>
        <Form {...methods}>
          <CardContent className="space-y-4 overflow-y-auto ">
            <RegisterCompanyForm />
          </CardContent>
          <div className="w-full flex justify-end px-2">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              {t("update.button")}
            </Button>
          </div>
        </Form>
      </Card>
    </main>
  );
};
