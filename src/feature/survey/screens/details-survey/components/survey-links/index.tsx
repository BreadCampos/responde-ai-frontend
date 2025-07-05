import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { CopyBadge } from "@/shared/components/copy.index";
import { Card, CardDescription, CardTitle } from "@/shared/components/ui/card";
import { ArrowDown } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
interface Props {
  genericLinkSlug?: string;
}
export const SurveyLinks = ({ genericLinkSlug }: Props) => {
  const qrCodeColors = {
    foregroundColor: "#0B2A4F", // Cor dos pontos do QR Code
    backgroundColor: "#FFFFFF", // Cor de fundo
  };

  const { company } = useAuthStore();

  // Tamanho do QR Code e do logo
  const qrCodeSize = 256;
  const logoSize = qrCodeSize / 4; // Logo ocupa 25% do QR Code
  return (
    <Card className="p-4 flex flex-col items-center justify-center text-center h-full lg:col-span-3 space-y-4">
      <CardTitle className="mb-2">Link e QR Code</CardTitle>
      <CardDescription>Compartilhe seu formulário</CardDescription>
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
      <a
        className="text-[12px] flex gap-2 items-center"
        href="#survey-custom-links"
      >
        <ArrowDown size={18} />
        Criar link customizado
      </a>
    </Card>
  );
};
