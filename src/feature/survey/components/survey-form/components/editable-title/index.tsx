import { useTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
import { Edit } from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

interface EditableTitleProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
  className?: string;
}

export const EditableTitle = ({
  initialTitle,
  onSave,
  className,
}: EditableTitleProps) => {
  const { t } = useTranslation("surveys");
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSave = () => {
    setIsEditing(false);
    if (title.trim() && title !== initialTitle) {
      onSave(title.trim());
    } else {
      setTitle(initialTitle);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      setTitle(initialTitle);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={cn(
          "p-2 -m-2 bg-background border border-primary rounded-lg outline-none",
          className
        )}
      />
    );
  }

  return (
    <h1
      onClick={() => setIsEditing(true)}
      className={cn(
        "p-2 text-md cursor-pointer hover:bg-muted/50 rounded-lg transition-colors",
        className
      )}
      title={t("createSurvey.clickToEdit")}
    >
      {initialTitle} <Edit className="inline h-4 w-4 ml-1 text-primary" />
    </h1>
  );
};
