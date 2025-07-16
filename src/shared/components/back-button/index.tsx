import { useNavigation } from "@/shared/hooks/use-nagivation";
import { ChevronLeft } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../button";

interface Props {
  children?: React.ReactNode;
  className?: string;
}
export const BackButton = ({ children, className }: Props) => {
  const navigate = useNavigation();
  const handleBack = () => {
    navigate.back();
  };
  return (
    <div
      className={cn(
        "relative flex h-14 w-full items-center justify-center ",
        "md:h-auto md:w-fit md:justify-start md:gap-1",
        className
      )}
    >
      <Button
        onClick={handleBack}
        variant="ghost"
        size="icon"
        className={cn(
          "text-card-foreground",
          "absolute left-2 top-1/2 -translate-y-1/2",
          "md:static md:translate-y-0"
        )}
      >
        <ChevronLeft />
      </Button>

      <div
        className={cn(
          "w-full text-center font-semibold",
          "px-12",
          "md:w-auto md:text-left md:px-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};
