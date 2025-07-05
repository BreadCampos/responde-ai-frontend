import { DefaultAvatar } from "@/shared/components/avatar.index";
import { BackButton } from "@/shared/components/back-button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { emptyValue } from "@/shared/utils/empty-string";
import { formatDate } from "@/shared/utils/format-date";
import { useParams } from "next/navigation";
import { GetCompanyQuery } from "../../service/get-company.query";

// Modelo de dados que você forneceu
export type CompanyModel = {
  addressLine: string;
  addressLineComplement: string | null;
  billingAddressLine: string | null;
  createdAt: string;
  document: string;
  fantasyName: string;
  id: string;
  legalName: string;
  logoUrl: string;
  ownerId: string;
  settings: {
    always_display_logo: boolean;
  };
  theme: {
    primary: string;
  };
  updatedAt: string;
};

export const DetailsCompany = () => {
  const { id } = useParams<{ id: string }>();
  const { data: companies } = GetCompanyQuery({ id });

  console.log({ companies });

  const company = companies;
  return (
    <div className="p-4 md:p-8 bg-muted/40 min-h-screen rounded-lg">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <BackButton className="w-full ">
              <div className="flex flex-col items-start  sm:flex-row sm:items-center gap-2 w-full ">
                <DefaultAvatar
                  src={company?.logoUrl}
                  name={company?.fantasyName}
                />

                <div className="flex-1">
                  <CardTitle className="text-2xl">
                    {company?.fantasyName}
                  </CardTitle>
                  <CardDescription>{company?.legalName}</CardDescription>
                </div>
                <Badge
                  variant="default"
                  className="max-w-[80%] truncate text-white"
                >
                  ID: {id}
                </Badge>
              </div>
            </BackButton>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Informações Gerais</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <strong className="text-card-foreground">Documento:</strong>{" "}
                  {emptyValue(company?.document)}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Endereços</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <strong className="text-card-foreground">
                    Endereço Principal:
                  </strong>
                  <p>{emptyValue(company?.addressLine)}</p>
                  <p className="text-xs">
                    <strong className="text-card-foreground">
                      Complemento:
                    </strong>{" "}
                    {emptyValue(company?.addressLineComplement)}
                  </p>
                </div>
                <div>
                  <strong className="text-card-foreground">
                    Endereço de Cobrança:
                  </strong>
                  <p>{emptyValue(company?.billingAddressLine)}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Configurações</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="always_display_logo"
                    checked={!!company?.settings?.always_display_logo}
                    disabled
                  />
                  <Label
                    htmlFor="always_display_logo"
                    className="text-sm text-muted-foreground"
                  >
                    Sempre exibir logo
                  </Label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Tema</h3>
                <div className="flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-full border"
                    style={{
                      backgroundColor: company?.theme?.primary || "#cccccc",
                    }}
                  />
                  <span className="text-sm text-muted-foreground font-mono">
                    {emptyValue(company?.theme?.primary)}
                  </span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Histórico</h3>
              <div className="flex-col flex text-sm text-muted-foreground justify-start items-start md:flex-row md:justify-between md:items-center gap-2">
                <p>
                  <strong className="text-card-foreground">Criado em:</strong>{" "}
                  {company?.createdAt
                    ? formatDate({
                        date: company?.createdAt,
                      })
                    : "-"}
                </p>
                <p>
                  <strong className="text-card-foreground">
                    Última atualização:
                  </strong>{" "}
                  {company?.updatedAt
                    ? formatDate({
                        date: company?.updatedAt,
                      })
                    : "-"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
