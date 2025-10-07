import { CopyBadge } from "@/shared/components/copy.index";
import { Card, CardDescription, CardTitle } from "@/shared/components/ui/card";
import { ArrowDown, Link } from "lucide-react";
import { useParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { useTranslation } from "react-i18next";
interface Props {
  genericLinkSlug?: string;
}
export const SurveyLinks = ({ genericLinkSlug }: Props) => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const qrCodeColors = {
    foregroundColor: "#0B2A4F",
    backgroundColor: "#FFFFFF",
  };

  const { t } = useTranslation("surveys");

  const qrCodeSize = 256;
  return (
    <Card className="p-4 flex flex-col items-center justify-center text-center h-full lg:col-span-3 space-y-4">
      <CardTitle className="mb-2">{t("surveyDetails.links.title")}</CardTitle>
      <CardDescription>{t("surveyDetails.links.description")}</CardDescription>
      <div className="flex flex-wrap gap-2 justify-center max-w-[90%]">
        {genericLinkSlug && <CopyBadge textToCopy={genericLinkSlug} />}
        <CopyBadge textToCopy={surveyId} />
      </div>
      {genericLinkSlug && (
        <div className="inline-block rounded-lg border-2 p-4">
          <QRCodeSVG
            value={genericLinkSlug}
            size={qrCodeSize}
            bgColor={qrCodeColors.backgroundColor}
            fgColor={qrCodeColors.foregroundColor}
            level={"H"}
            marginSize={5}
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
