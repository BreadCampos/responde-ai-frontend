"use client";

import { Button } from "@/shared/components/button";
import { useTranslation } from "@/shared/hooks/use-translation";
import { cn } from "@/shared/lib/utils";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { SurveyQuestion } from "../../model/survey.model";
import { InputPreview } from "../survey-form/components/input-preview";
import { shouldShowQuestion } from "../survey-form/helper/shouled-show-question";

interface Props {
  questions: SurveyQuestion[];
  title?: string;
  className?: string;
  logoUrl?: string;
  isPreview?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void;
}
export const QuestionsForm = ({
  questions,
  title = "Preview",
  className,
  isPreview,
  onSubmit,
}: Props) => {
  const { t } = useTranslation("common");
  const { trigger, getValues, handleSubmit, formState, watch } =
    useFormContext();
  const [currentPage, setCurrentPage] = useState(1);
  const formValues = watch();
  const [isNavigating, setIsNavigating] = useState(false);

  const verifyShowQuestion = (question: SurveyQuestion) => {
    return !shouldShowQuestion(question, formValues);
  };
  const totalPages = Math.max(...questions?.map((q) => q?.pageIndex), 1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };
  const questionsOnCurrentPage = useMemo(() => {
    return questions.filter((q) => q.pageIndex === currentPage);
  }, [currentPage, questions]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPreviewSubmit = (data: any) => {
    if (onSubmit) {
      onSubmit(data);
    }
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

  return (
    <form
      onSubmit={handleSubmit(onPreviewSubmit)}
      className={cn(
        "max-w-[600px] min-h-[500px]  h-[calc(100vh-160px)] flex-1 flex flex-col gap-4 border p-4 rounded-lg bg-card shadow-md",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="flex w-full items-start justify-between mb-4">
          {title && (
            <h4 className="text-card-foreground text-xl mb-4"> {title}</h4>
          )}
        </div>
        <div className="flex flex-col gap-4 bg-background p-4 rounded-lg">
          {questionsOnCurrentPage.map((q) => {
            const isDisabled = verifyShowQuestion(q);

            if (isPreview) {
              return (
                <div
                  key={q.id}
                  className={cn(
                    "transition-opacity duration-300 ease-in-out",
                    isDisabled && "opacity-20 pointer-events-none"
                  )}
                >
                  <InputPreview question={q} disabled={isDisabled} />
                </div>
              );
            }
            if (isDisabled) {
              return null;
            }

            return <InputPreview question={q} key={q.id} />;
          })}
        </div>
      </div>
      {totalPages > 1 ? (
        <>
          {questions?.length > 0 && (
            <div className="flex items-center bg-card justify-between sticky bottom-0  pt-2 border-t-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                {t("button.previous")}
              </Button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
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
                  )
                )}
              </div>
              {currentPage < totalPages ? (
                <Button
                  type="button"
                  onClick={(e) => handleNextPage(e)}
                  disabled={isNavigating}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {isNavigating ? t("button.validating") : t("button.next")}
                </Button>
              ) : (
                <Button type="submit" disabled={formState.isSubmitting}>
                  {formState.isSubmitting
                    ? t("button.submiting")
                    : t("button.send")}
                </Button>
              )}
            </div>
          )}
        </>
      ) : (
        <Button type="submit" disabled={formState.isSubmitting}>
          {formState.isSubmitting ? t("button.submiting") : t("button.send")}
        </Button>
      )}
    </form>
  );
};
