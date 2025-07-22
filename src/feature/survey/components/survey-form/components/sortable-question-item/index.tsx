import type { SurveyQuestion } from "@/feature/survey/model/survey.model";
import { Button } from "@/shared/components/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronsUpDown, Edit, Trash2 } from "lucide-react";

interface Props {
  question: SurveyQuestion;
  onDelete: (questionId: string) => void;
  onEdit: (question: SurveyQuestion) => void;
  index: number;
}

export function SortableQuestionItem({
  onDelete,
  index,
  question,
  onEdit,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  console.log({ question });

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="p-2 border rounded-lg bg-card shadow-sm"
    >
      <div className="flex items-center justify-between gap-2 ">
        <div className="flex items-center gap-2 flex-1 ">
          <p className="text-primary">{index + 1} -</p>
          <p className="flex-1 text-card-foreground">{question.label}</p>
        </div>

        <div className="flex items-center">
          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            onClick={() => onEdit(question)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full transition-colors"
            title="Editar pergunta"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => onDelete(question.id)}
            variant={"ghost"}
            size={"icon"}
            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
            aria-label="Deletar pergunta"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div {...listeners} className="p-2 cursor-grab text-card-foreground">
            <ChevronsUpDown />
          </div>
        </div>
      </div>
    </div>
  );
}
