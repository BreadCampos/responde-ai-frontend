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
import { formatDocument } from "@/shared/utils/format-cpf";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RegisterCompanyForm } from "../../components/register-company-form";
import { GetCompanyQuery } from "../../service/get-company.query";
import { useUpdateCompanyMutation } from "../../service/update-company.mutation";
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
  const { data: company, isLoading } = GetCompanyQuery({ id });

  const { isPending, mutate } = useUpdateCompanyMutation();
  const onSubmit = (data: UpdateCompanyFormValues) => {
    console.log("Submitted data:", data);

    mutate({
      id: id,
      company: {
        ...data.company,
        document: data.company.document.replace(/\D/g, ""), // Ensure document is formatted correctly
      },
    });
  };

  const loading = isPending || isLoading;

  useEffect(() => {
    if (!company) {
      return;
    }

    const formattedCompany = {
      ...company,
      document: formatDocument(company.document),
    };
    reset({ company: formattedCompany });
  }, [company, reset]);

  return (
    <main
      className={cn(
        "flex-1 space-y-2 p-2 pt-6 h-full bg-muted/40 rounded-lg flex flex-col items-center justify-start overflow-y-auto",
        "md:p-4"
      )}
    >
      <Form {...methods}>
        <div className="max-w-3xl w-full space-y-1 flex flex-col items-center ">
          <Card className="min-w-full">
            <CardHeader className="space-y-2">
              <CardTitle className="text-1xl flex flex-col gap-2 items-center justify-between md:flex-row">
                <BackButton>Atualizar Empresa</BackButton>
              </CardTitle>
              <CardDescription>
                Atualize as informações da sua empresa. Essas informações serão
                exibidas para os usuários e clientes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RegisterCompanyForm />
            </CardContent>
          </Card>
          <div className="w-full flex justify-end mt-4">
            <Button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              Atualizar Empresa
            </Button>
          </div>
        </div>
      </Form>
    </main>
  );
};
