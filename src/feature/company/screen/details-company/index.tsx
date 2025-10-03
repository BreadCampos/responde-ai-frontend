"use client";

import { ROUTES } from "@/core/routes/route-constants";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { BackButton } from "@/shared/components/back-button";
import { Button } from "@/shared/components/button";
import { CompanyLogo } from "@/shared/components/company-logo";
import { CopyBadge } from "@/shared/components/copy.index";
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
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useTranslation } from "@/shared/hooks/use-translation";
import { emptyValue } from "@/shared/utils/empty-string";
import { formatDocument } from "@/shared/utils/format-cpf";
import { formatDate } from "@/shared/utils/format-date";
import { Edit } from "lucide-react";
import { useParams } from "next/navigation";

export const DetailsCompany = () => {
  const { id } = useParams<{ id: string }>();
  const { company } = useAuthStore();
  const { t } = useTranslation("company");

  const navigate = useNavigation();

  const goToEditCompany = () => {
    navigate.push(ROUTES.COMPANY_EDIT.replace(":id", id));
  };

  return (
    <div className="p-4 md:p-8 bg-muted/40 min-h-screen rounded-lg">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex flex-col justify-between items-start sm:justify-center gap-1 p-4 rounded-lg w-full">
              <div className="flex flex-col flex-start items-start gap-4 w-full">
                <BackButton>
                  <div className="flex items-center">
                    <CompanyLogo className="min-w-auto max-w-[200px]" />
                    <Button
                      variant="ghost"
                      className="ml-2"
                      size="icon"
                      onClick={goToEditCompany}
                    >
                      <Edit />
                    </Button>
                  </div>
                </BackButton>
                <div className="flex-1 w-full">
                  <CardTitle className="text-2xl">
                    {company?.fantasyName}
                  </CardTitle>
                  <CardDescription>{company?.legalName}</CardDescription>
                  <CopyBadge
                    textToCopy={id}
                    className="max-w-[80%] truncate mt-5 "
                  />
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">
                {t("details.generalInfo.title")}
              </h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <strong className="text-card-foreground">
                    {t("details.generalInfo.document")}
                  </strong>{" "}
                  {company?.document ? formatDocument(company?.document) : "-"}
                </p>

                {company?.publicKey && (
                  <p className="flex items-center gap-2">
                    {" "}
                    <strong className="text-card-foreground">
                      {t("details.generalInfo.publicKey")}
                    </strong>{" "}
                    <CopyBadge
                      secret={true}
                      textToCopy={company?.publicKey}
                      className="max-w-[80%] truncate"
                    />
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">
                {t("details.addresses.title")}
              </h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <strong className="text-card-foreground">
                    {t("details.addresses.mainAddress")}
                  </strong>
                  <p>{emptyValue(company?.addressLine)}</p>
                  <p className="text-xs">
                    <strong className="text-card-foreground">
                      {t("details.addresses.complement")}
                    </strong>{" "}
                    {emptyValue(company?.addressLineComplement)}
                  </p>
                </div>
                <div>
                  <strong className="text-card-foreground">
                    {t("details.addresses.billingAddress")}
                  </strong>
                  <p>{emptyValue(company?.billingAddressLine)}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("details.settings.title")}
                </h3>
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
                    {t("details.settings.alwaysDisplayLogo")}
                  </Label>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  {t("details.theme.title")}
                </h3>
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
              <h3 className="font-semibold text-lg mb-2">
                {t("details.history.title")}
              </h3>
              <div className="flex-col flex text-sm text-muted-foreground justify-start items-start md:flex-row md:justify-between md:items-center gap-2">
                <p>
                  <strong className="text-card-foreground">
                    {t("details.history.createdAt")}
                  </strong>{" "}
                  {company?.createdAt
                    ? formatDate({
                        date: company?.createdAt,
                      })
                    : "-"}
                </p>
                <p>
                  <strong className="text-card-foreground">
                    {t("details.history.lastUpdate")}
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
