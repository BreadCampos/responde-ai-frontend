"use client";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useParams } from "next/navigation";
import { BackButton } from "../../../shared/components/back-button";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../shared/components/ui/card";
import { formatDate } from "../../../shared/utils/format-date";
import { GetSurveyResponsesDetailsQuery } from "../services/get-survey-response-details.query";

import {
  Globe,
  Languages,
  MapPin,
  MonitorCog,
  MonitorSmartphone,
  Timer,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../../shared/components/ui/form";
import { SecondsToHoursMinutesSeconds } from "../../../shared/utils/seconds-to-hh-mm-ss";
import { InputPreview } from "../../survey/components/survey-form/components/input-preview";
import {
  Answer,
  Metrics,
  Question,
} from "../../survey/model/survey-response-details";
import { SurveyQuestion } from "../../survey/model/survey.model";

type Params = {
  surveyId: string;
  surveyResponseId: string;
};

export const groupAndSortQuestionsByPage = (
  questions: Question[]
): Question[][] => {
  const groupedByPage = questions.reduce((acc, question) => {
    const { pageIndex } = question;
    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }
    acc[pageIndex].push(question);
    return acc;
  }, {} as { [pageIndex: number]: Question[] });

  return Object.keys(groupedByPage)
    .sort((a, b) => Number(a) - Number(b))
    .map((pageIndex) => {
      const page = groupedByPage[pageIndex as unknown as number];
      page.sort((a, b) => a.orderIndex - b.orderIndex);
      return page;
    });
};

type TQAndA = Record<
  string,
  {
    answer: Omit<Answer, "question">;
    question: Question;
  }
>;

export const SurveyResponseDetails = () => {
  const { surveyId, surveyResponseId } = useParams<Params>();
  const { company } = useAuthStore();

  const { data, isFetching } = GetSurveyResponsesDetailsQuery({
    surveyId: surveyId,
    surveyResponseId: surveyResponseId,
    companyId: company?.id,
  });

  if (!data || isFetching) return;

  const { submittedAt, metrics, answers, timeToSubmitSeconds } = data;

  const questions = answers.map((item) => item.question);
  const groupedQuestions = groupAndSortQuestionsByPage(questions);

  const { questionAndAnswers, plain } = getQuestionsAndAnswers(
    groupedQuestions,
    answers
  );

  return (
    <>
      <div className="p-4 md:p-8 bg-muted/40 min-h-screen rounded-lg">
        <div className="max-w-4xl mx-auto space-y-6">
          <SubmittedHeader
            submittedAt={submittedAt}
            metrics={metrics}
            timeToSubmitSeconds={timeToSubmitSeconds}
          />
          <RenderGroupedQuestions
            groupedQuestions={groupedQuestions}
            questionAndAnswers={questionAndAnswers}
            plain={plain}
          />
        </div>
      </div>
    </>
  );
};

function RenderGroupedQuestions({
  groupedQuestions,
  questionAndAnswers,
  plain,
}: {
  groupedQuestions: Question[][];
  questionAndAnswers: TQAndA;
  plain: Record<string, unknown>;
}) {
  const methods = useForm();

  useEffect(() => {
    methods.reset(plain);
  }, [methods, plain]);

  return (
    <Form {...methods}>
      {groupedQuestions.map((questions, idx) => (
        <RenderQuestionPage
          page={idx + 1}
          questions={questions}
          key={idx}
          questionAndAnswers={questionAndAnswers}
          pageCount={groupedQuestions.length}
        />
      ))}
    </Form>
  );
}

function RenderQuestionPage({
  questionAndAnswers,
  questions,
  page,
  pageCount,
}: {
  questions: Question[];
  questionAndAnswers: TQAndA;
  page: number;
  pageCount: number;
}) {
  return (
    <Card>
      <CardHeader>
        Página {page} de {pageCount}
      </CardHeader>
      <CardContent className="flex gap-6 flex-col">
        {questions.map((question) => (
          <RenderQuestions
            answer={questionAndAnswers[question.id].answer}
            question={question}
            key={question.id}
          />
        ))}
      </CardContent>
    </Card>
  );
}

function RenderQuestions({
  question,
  answer,
}: {
  question: Question;
  answer: Omit<Answer, "question">;
}) {
  return (
    <InputPreview
      question={question as SurveyQuestion}
      disabled={true}
      answer={answer.value}
    />
  );
}

function getQuestionsAndAnswers(
  groupedQuestions: Array<Question[]>,
  answers: Answer[]
) {
  const questionAndAnswers: Record<
    string,
    {
      answer: Answer;
      question: Question;
    }
  > = {};

  const plain: Record<string, unknown> = {};

  for (const gQuestionIdx in groupedQuestions) {
    const questions = groupedQuestions[gQuestionIdx];
    for (const question of questions) {
      const answer = answers.find(
        (answer) => answer.questionId === question.id
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { question: _question, ...rest } = answer as Answer;
      plain[question.id] = rest.value;
      questionAndAnswers[question.id] = {
        answer: rest,
        question,
      } as {
        answer: Answer;
        question: Question;
      };
    }
  }
  return { questionAndAnswers, plain };
}

function SubmittedHeader({
  submittedAt,
  metrics,
  timeToSubmitSeconds,
}: {
  submittedAt: string;
  metrics: Metrics;
  timeToSubmitSeconds?: number;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="flex hidden md:flex justify-between w-full">
          <BackButton className="w-full"></BackButton>
          <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2 w-full ">
            <div className="flex justify-between items-baseline w-full">
              <h2 className="text-2xl font-bold tracking-tight text-card-foreground">
                Detalhes da Resposta
              </h2>
              <p className="text-sm text-muted-foreground">
                Enviado em:{" "}
                {formatDate({
                  date: submittedAt,
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex md:hidden flex-col w-full">
          <BackButton className="w-full">Detalhes da Resposta</BackButton>
          <div className="w-full text-center">
            <p className="text-sm text-muted-foreground">
              Enviado em:{" "}
              {formatDate({
                date: submittedAt,
              })}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-center space-x-3">
            <MonitorSmartphone />
            <div>
              <p className="font-semibold text-muted-foreground">Dispositivo</p>

              <p className="text-card-foreground capitalize">
                {metrics.deviceType}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MonitorCog />
            <div>
              <p className="font-semibold text-muted-foreground">
                Sistema Operacional
              </p>
              <p className="text-card-foreground">{metrics.os.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Globe />
            <div>
              <p className="font-semibold text-muted-foreground">Navegador</p>
              <p className="text-card-foreground">
                {metrics.browser.name} {metrics.browser.version}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Languages />
            <div>
              <p className="font-semibold text-muted-foreground">Idioma</p>
              <p className="text-card-foreground uppercase">
                {metrics.language}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin />
            <div>
              <p className="font-semibold text-muted-foreground">
                IP (Anônimo)
              </p>
              <p className="text-card-foreground">{metrics.ipAnonymized}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Timer />
            <div>
              <p className="font-semibold text-muted-foreground">
                Tempo de resposta
              </p>
              <p className="text-card-foreground">
                {SecondsToHoursMinutesSeconds(timeToSubmitSeconds)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
