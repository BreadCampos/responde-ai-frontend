import { cn } from "@/shared/lib/utils";
import { calculateInitials } from "@/shared/utils/calculate-initials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  src?: string;
  name?: string;

  className?: string;
}
export const DefaultAvatar = ({ name, src, className }: Props) => {
  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage
        src={src}
        className="w-[100px] max-w-[100px] h-auto object-cover rounded-none"
      />
      <AvatarFallback>{calculateInitials(name)}</AvatarFallback>
    </Avatar>
  );
};
