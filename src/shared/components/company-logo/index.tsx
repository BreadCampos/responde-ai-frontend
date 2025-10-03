import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { cn } from "@/lib/utils";
import { useTheme } from "@/shared/hooks/use-theme";
import { calculateInitials } from "@/shared/utils/calculate-initials";
import { Image, ImageFallback, ImageRoot } from "../ui/image-with-fallback";

interface Props {
  className?: string;
  src?: string;
  name?: string;
}

export const CompanyLogo = ({ src, name, className }: Props) => {
  const { logoSrc } = useTheme();

  const { company, publicCompany } = useAuthStore();

  const companyName = publicCompany?.fantasyName || company?.fantasyName || "";

  return (
    <ImageRoot className={cn("w-fit min-w-[100px]", className)}>
      <Image
        src={src || logoSrc}
        alt={name ? `Logo de ${name}` : "Logo da empresa"}
        className="h-full w-full  object-contain"
      />
      <ImageFallback className="rounded-lg">
        {calculateInitials(name || companyName)}
      </ImageFallback>
    </ImageRoot>
  );
};
