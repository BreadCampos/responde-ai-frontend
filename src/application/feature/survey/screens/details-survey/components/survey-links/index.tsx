import { Button } from "@/application/shared/components/button";
import { QrCode, PlusCircle } from "lucide-react";
import { CopyBadge } from "@/application/shared/components/copy.index";
import {
  CardDescription,
  CardTitle,
} from "@/application/shared/components/ui/card";
interface Props {
  genericLinkSlug?: string;
}
export const SurveyLinks = ({ genericLinkSlug }: Props) => {
  return (
    <>
      <CardTitle className="mb-2">Link e QR Code</CardTitle>
      <CardDescription>Compartilhe seu formulário</CardDescription>
      <Button size="default" className="">
        <PlusCircle className="mr-2 h-5 w-5" /> Criar link customizado
      </Button>
      {genericLinkSlug && <CopyBadge textToCopy={genericLinkSlug} />}
      <Button variant="outline">
        <QrCode className="mr-2 h-4 w-4" /> Gerar QR Code
      </Button>
    </>
  );
};
