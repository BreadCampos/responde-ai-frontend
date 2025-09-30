import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  src?: string;
  name?: string;

  className?: string;
}
export const DefaultAvatar = ({ name, src, className }: Props) => {
  const calculateInitials = (fullName?: string): string => {
    if (!fullName || fullName.trim() === "") {
      return "";
    }

    const words = fullName
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (words.length === 0) {
      return "";
    }

    const firstInitial = words[0][0];

    if (words.length > 1) {
      const secondInitial = words[1][0];
      return `${firstInitial}${secondInitial}`.toUpperCase();
    }

    return firstInitial.toUpperCase();
  };

  return (
    <Avatar className={cn("h-10 w-10", className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{calculateInitials(name)}</AvatarFallback>
    </Avatar>
  );
};
