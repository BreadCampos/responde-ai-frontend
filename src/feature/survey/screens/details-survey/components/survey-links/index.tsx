import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { CopyBadge } from "@/shared/components/copy.index";
import { Card, CardDescription, CardTitle } from "@/shared/components/ui/card";
import { useTranslation } from "@/shared/hooks/use-translation";
import { ArrowDown, Link } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
interface Props {
  genericLinkSlug?: string;
}
export const SurveyLinks = ({ genericLinkSlug }: Props) => {
  const qrCodeColors = {
    foregroundColor: "#0B2A4F", // Cor dos pontos do QR Code
    backgroundColor: "#FFFFFF", // Cor de fundo
  };

  const { t } = useTranslation();
  const { company } = useAuthStore();

  const qrCodeSize = 256;
  const logoSize = qrCodeSize / 4;
  return (
    <Card className="p-4 flex flex-col items-center justify-center text-center h-full lg:col-span-3 space-y-4">
      <CardTitle className="mb-2">{t("surveyDetails.links.title")}</CardTitle>
      <CardDescription>{t("surveyDetails.links.description")}</CardDescription>
      {genericLinkSlug && <CopyBadge textToCopy={genericLinkSlug} />}
      {genericLinkSlug && (
        <div className="inline-block rounded-lg border-2 p-4">
          <QRCodeSVG
            value={genericLinkSlug}
            size={qrCodeSize}
            bgColor={qrCodeColors.backgroundColor}
            fgColor={qrCodeColors.foregroundColor}
            level={"H"}
            marginSize={5}
            imageSettings={
              company?.logoUrl
                ? {
                    src: company?.logoUrl,
                    x: undefined,
                    y: undefined,
                    height: logoSize,
                    width: logoSize,
                    crossOrigin: "anonymous",

                    excavate: true,
                  }
                : undefined
            }
          />
        </div>
      )}

      <div>
        <a
          className="text-[12px] flex gap-2 items-center"
          href="#survey-custom-links"
        >
          <ArrowDown size={18} />
          {t("surveyDetails.links.customLink")}
        </a>
        <a
          className="text-[12px] flex gap-2 items-center"
          href="#survey-custom-links"
        >
          <Link size={18} />
          {t("surveyDetails.links.incorporate")}
        </a>
      </div>
    </Card>
  );
};
