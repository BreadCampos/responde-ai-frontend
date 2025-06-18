import { useFormContext } from "react-hook-form";
import type { SurveyQuestion } from "../../model/survey.model";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { InputPreview } from "../survey-form/components/input-preview";
import { shouldShowQuestion } from "../survey-form/helper/shouled-show-question";
import { Button } from "@/application/shared/components/button";
import { cn } from "@/application/shared/lib/utils";

interface Props {
  questions: SurveyQuestion[];
  title?: string;
  className?: string;
}
export const QuestionsFormPreview = ({
  questions,
  title = "Preview",
  className,
}: Props) => {
  const { trigger, getValues, handleSubmit, formState, watch } =
    useFormContext();
  const [currentPage, setCurrentPage] = useState(1);
  const formValues = watch();
  const [isNavigating, setIsNavigating] = useState(false);

  const verifyShowQuestion = (question: SurveyQuestion) => {
    return !shouldShowQuestion(question, formValues);
  };
  const totalPages = useMemo(() => {
    if (questions.length === 0) return 1;
    return Math.max(...questions.map((q) => q.pageIndex), 1);
  }, [questions]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };
  const questionsOnCurrentPage = useMemo(() => {
    return questions.filter((q) => q.pageIndex === currentPage);
  }, [currentPage, questions]);
  const onPreviewSubmit = () => {
    toast.success("Simulação de envio do formulário completo.");
  };

  const handleNextPage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isNavigating) return;
    e.preventDefault();
    setIsNavigating(true);
    try {
      const visibleFieldsOnPage = questions
        .filter(
          (q) =>
            q.pageIndex === currentPage && shouldShowQuestion(q, getValues())
        )
        .map((q) => q.id);
      const isValid = await trigger(visibleFieldsOnPage);
      if (isValid && currentPage < totalPages) {
        setCurrentPage((p) => p + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } finally {
      setIsNavigating(false);
    }
  };

  useEffect(() => {}, [questions]);
  return (
    <form
      onSubmit={handleSubmit(onPreviewSubmit)}
      className={cn(
        "min-h-[500px]  h-[calc(100vh-250px)]  overflow-y-auto flex-1 flex flex-col gap-4 border p-4 rounded-lg bg-card shadow-md",
        className
      )}
    >
      <div className="flex-1">
        <h4 className="text-card-foreground text-xl"> {title}</h4>

        <div className="flex flex-col gap-4 bg-background p-4 rounded-lg mt-4">
          {questionsOnCurrentPage.map((q) => {
            if (verifyShowQuestion(q)) {
              return null;
            }

            return <InputPreview question={q} />;
          })}
        </div>
      </div>
      {questions.length > 0 && (
        <div className="flex items-center bg-transparent justify-between sticky bottom-0  pt-2 border-t-2 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`w-4 h-4 rounded-full text-sm text-[11px] font-bold transition-all ${
                  currentPage === page
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-card/30"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          {currentPage < totalPages ? (
            <Button
              type="button"
              onClick={(e) => handleNextPage(e)}
              disabled={isNavigating}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {isNavigating ? "Validando..." : "Próxima"}
            </Button>
          ) : (
            <Button type="submit" disabled={formState.isSubmitting}>
              {formState.isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          )}
        </div>
      )}
    </form>
  );
};
