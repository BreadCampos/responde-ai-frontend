import { MoveLeft } from "lucide-react";
import { Button } from "../button";
import { cn } from "../../lib/utils";
import { useRouter } from "next/navigation";
interface Props {
  children?: React.ReactNode;
  className?: string;
}
export const BackButton = ({ children, className }: Props) => {
  const navigate = useRouter();
  const handleBack = () => {
    navigate.back();
  };
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Button
        onClick={handleBack}
        variant="ghost"
        className={"text-card-foreground  flex-shrink-0"}
        size={"icon"}
      >
        <MoveLeft size={24} />
      </Button>
      {children}
    </div>
  );
};
