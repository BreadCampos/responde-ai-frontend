"use client";

import type {
  SurveyModel,
  SurveyQuestion,
} from "@/feature/survey/model/survey.model";
import { useMemo, useState } from "react";
import { EditableTitle } from "./components/editable-title";

import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { BackButton } from "@/shared/components/back-button";
import { Button } from "@/shared/components/button";
import { Form } from "@/shared/components/ui/form";
import { useToggle } from "@/shared/hooks/use-toggle";
import { useTranslation } from "@/shared/hooks/use-translation";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Check, Plus } from "lucide-react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { QuestionsForm } from "../questions-form-preview";
import { SortableQuestionItem } from "./components/sortable-question-item";
import { ServeyModal } from "./components/survey-modal";

interface Props {
  onSubmit?: (
    survey: SurveyModel & {
      deletedQuestionIds: string[];
      newQuestionIds: string[];
    }
  ) => void;
  loading?: boolean;
  buttonSubmitText: string;
}

export const SurveyForm = ({ loading, onSubmit, buttonSubmitText }: Props) => {
  const { control, watch, handleSubmit, getValues, setValue } =
    useFormContext<SurveyModel>();

  const { fields, update, remove } = useFieldArray({
    control,
    name: "questions",
    keyName: "key",
  });

  const { t } = useTranslation("surveys");
  const surveyTitle = watch("title");
  const surveyQuestions = watch("questions");

  const [deletedQuestionIds, setDeletesQuestionIds] = useState<string[]>([]);
  const [newQuestionIds, setNewQuestionIds] = useState<string[]>([]);

  const addSequentialForm = () => {
    const sequential: SurveyQuestion[] = [
      // form sequencial

      // 1. O PONTO DE PARTIDA: CAMPO DE TEXTO SIMPLES
      {
        id: "test-01-text",
        label: "Para começar, qual é o nome do seu projeto de teste?",
        type: "text",
        placeholder: "Ex: Construtor de Formulários",
        pageIndex: 1,
        orderIndex: 0,
        validations: [{ type: "required" }],
      },

      // 2. CAMPO NUMÉRICO (DEPENDE DO ANTERIOR)
      {
        id: "test-02-number",
        label: "Quantos anos tem este projeto?",
        type: "number",
        placeholder: "Ex: 2",
        pageIndex: 1,
        orderIndex: 1,
        validations: [
          { type: "required" },
          {
            type: "min",
            options: { value: 1 },
            errorMessage: "O projeto deve ter pelo menos 1 ano.",
          },
        ],
        conditional: {
          fieldId: "test-01-text",
          operator: "contains", // Aparece se o nome do projeto for preenchido
          value: " ", // com qualquer coisa que contenha um espaço
        },
      },

      // 3. CAMPO DE DATA (DEPENDE DO ANTERIOR)
      {
        id: "test-03-date",
        label: "Qual a data de início oficial do projeto?",
        type: "date",
        pageIndex: 1,
        orderIndex: 2,

        validations: [
          { type: "required" },
          {
            type: "max",
            options: {
              value: new Date().toISOString().split("T")[0], // Define a data máxima como hoje
            },
          },
        ],
        conditional: {
          fieldId: "test-02-number",
          // operator: "greater_than_equal",
          // value: "1",
          operator: "not_equals", // Aparece assim que uma data for selecionada
          value: "",
        },
      },

      // 4. CAMPO DE RÁDIO (DEPENDE DO ANTERIOR)
      {
        id: "test-04-radio",
        label: "O projeto está atualmente em produção?",
        type: "radio",
        pageIndex: 1,
        orderIndex: 3,
        validations: [{ type: "required" }],
        selectOptions: [
          { label: "Sim, está no ar", value: "yes" },
          {
            label: "Não, ainda está em desenvolvimento",
            value: "no",
          },
        ],
        conditional: {
          fieldId: "test-03-date",
          operator: "not_equals", // Aparece assim que uma data for selecionada
          value: "",
        },
      },

      // 5. CAMPO CHECKBOX (DEPENDE DO ANTERIOR)
      {
        id: "test-05-checkbox",
        label: "Confirmo que este é um projeto prioritário.",
        type: "checkbox",
        pageIndex: 1,
        orderIndex: 4,
        validations: [{ type: "required" }],
        conditional: {
          fieldId: "test-04-radio",
          operator: "equals",
          value: "yes",
        },
      },

      // 6. CAMPO SELECT (DEPENDE DO ANTERIOR)
      {
        id: "test-06-select",
        label: "Qual a fase atual?",
        type: "select",
        placeholder: "Selecione uma fase",
        pageIndex: 1,
        orderIndex: 5,
        validations: [{ type: "required" }],
        selectOptions: [
          {
            label: "Descoberta",
            value: "discovery",
          },
          { label: "MVP", value: "mvp" },
          { label: "Escala", value: "scaling", disabled: true },
        ],
        conditional: {
          fieldId: "test-05-checkbox",
          operator: "equals",
          value: true, // O valor de um checkbox marcado é um booleano
        },
      },

      // 7. CAMPO TEXTAREA (DEPENDE DO ANTERIOR)
      {
        id: "test-07-textarea",
        label: "Descreva o principal objetivo desta fase.",
        type: "textarea",
        placeholder:
          "Ex: Validar a hipótese principal com utilizadores reais...",
        pageIndex: 1,
        hint: "Validar",
        orderIndex: 6,
        validations: [{ type: "required" }],
        conditional: {
          fieldId: "test-06-select",
          operator: "equals",
          value: "mvp",
        },
      },

      // 8. CAMPO RATING (ESTRELAS) (DEPENDE DO ANTERIOR)
      {
        id: "test-08-rating-stars",
        label: "Avalie a complexidade técnica (1-5 estrelas).",
        type: "rating",
        pageIndex: 1,
        orderIndex: 7,
        validations: [{ type: "required" }],
        ratingOptions: { min: 1, max: 5, style: "stars" },
        conditional: {
          fieldId: "test-07-textarea",
          operator: "contains",
          value: "Validar",
        },
      },

      // 9. CAMPO CHECKBOX GROUP (DEPENDE DO ANTERIOR)
      {
        id: "test-09-checkbox-group",
        label: "Quais tecnologias estão envolvidas?",
        type: "checkbox_group",
        pageIndex: 1,
        orderIndex: 8,
        validations: [{ type: "required" }],
        selectOptions: [
          {
            label: "React/Next.js",
            value: "react",
          },
          { label: "Node.js", value: "node" },
          {
            label: "Banco de Dados SQL",
            value: "sql",
          },
        ],
        conditional: {
          fieldId: "test-08-rating-stars",
          operator: "greater_than_equal",
          value: "3",
        },
      },

      // 10. CAMPO SELECT MÚLTIPLO (DEPENDE DO ANTERIOR)
      {
        id: "test-10-select-multiple",
        label: "Quais equipas estão alocadas?",
        type: "select_multiple",
        pageIndex: 1,
        orderIndex: 9,
        validations: [{ type: "required" }],
        selectOptions: [
          {
            label: "Frontend",
            value: "frontend",
          },
          { label: "Backend", value: "backend" },
          { label: "DevOps", value: "devops" },
        ],
        conditional: {
          fieldId: "test-09-checkbox-group",
          operator: "contains", // Aparece se 'React/Next.js' for marcado
          value: "react",
        },
      },

      // 11. CAMPO COM MÁSCARA (DEPENDE DO ANTERIOR)
      {
        id: "test-11-masked-text",
        label: "Qual o CNPJ da empresa principal?",
        type: "text",
        placeholder: "00.000.000/0000-00",
        pageIndex: 1,
        orderIndex: 10,
        mask: ["00.000.000/0000-00"],
        validations: [
          { type: "required" },
          { type: "cnpj", errorMessage: "Por favor, insira um CNPJ válido." },
        ],
        conditional: {
          fieldId: "test-10-select-multiple",
          operator: "contains", // Aparece se 'Backend' for selecionado
          value: "backend",
        },
      },
      // 12. CAMPO DE AVALIAÇÃO NPS (DEPENDE DO ANTERIOR)
      {
        id: "test-12-nps",
        label: "Quanto ficou satisfeito com sua experiencia?.",
        type: "rating",
        pageIndex: 1,
        orderIndex: 11,
        validations: [{ type: "required" }],
        ratingOptions: {
          style: "nps",
          maxLabel: "Muito satisfeito",
          minLabel: "Muito insatisfeito",
          min: 0,
          max: 10,
        },
        conditional: {
          fieldId: "test-11-masked-text",
          operator: "not_equals",
          value: "",
        },
      },

      // 13. CAMPO DE FEEDBACK CONDICIONAL (DEPENDE DO NPS)
      {
        id: "test-13-textArea",
        label: "Conte o que não te agradou?.",
        type: "textarea",
        pageIndex: 1,
        orderIndex: 12,
        validations: [{ type: "required" }],
        placeholder: "Conte o que não te agradou...",
        conditional: {
          fieldId: "test-12-nps",
          operator: "less_than_equal",
          value: "4",
        },
      },
      // 14. CAMPO DE AVALIAÇÃO CONDICIONAL (DEPENDE DO NPS)
      {
        id: "test-13-slider",
        label: "Quanto vc recomendaria para algum conhecido?.",
        type: "rating",
        pageIndex: 1,
        orderIndex: 13,
        validations: [{ type: "required" }],
        ratingOptions: { min: 1, max: 10, style: "slider" },
        conditional: {
          fieldId: "test-12-nps",
          operator: "greater_than_equal",
          value: "5",
        },
      },
    ];
    setValue("questions", sequential);
    toast.success("Exemplo sequencial carregado.");
  };

  const formExemple = () => {
    const exampleQuestions: SurveyQuestion[] = [
      // 1. O PONTO DE PARTIDA: CAMPO DE TEXTO SIMPLES
      // --- PÁGINA 1: DADOS BÁSICOS ---
      {
        id: "3ccd1506-de25-453a-b7ec-8a2b1aa349a5",
        label: "Primeiro, qual o seu nome?",
        type: "text",
        placeholder: "Digite seu nome completo",
        pageIndex: 1,
        orderIndex: 0,
        validations: [
          {
            type: "required",
            errorMessage: "O nome é obrigatório.",
          },
          {
            type: "min_length",
            options: { value: 3 },
            errorMessage: "Por favor, insira um nome com pelo menos 3 letras.",
          },
        ],
      },
      {
        id: "43abd582-b8b9-4672-94f6-a2ccdc3508cb",
        label: "E o seu melhor e-mail?",
        type: "text",
        placeholder: "exemplo@dominio.com",
        hint: "Usado apenas para comunicação sobre a pesquisa.",
        pageIndex: 1,
        orderIndex: 1,
        validations: [
          { type: "required" },
          {
            type: "email",
            errorMessage: "Por favor, insira um formato de e-mail válido.",
          },
        ],
      },
      {
        id: "89f7e8b7-3f3c-4cc3-b56b-aa45091fcff3",
        label:
          "Você aceita receber um contato por telefone para falarmos sobre sua experiência?",
        type: "radio",
        pageIndex: 1,
        orderIndex: 2,
        selectOptions: [
          { label: "Sim, aceito", value: "yes" },
          {
            label: "Não, prefiro não ser contatado",
            value: "no",
          },
        ],
        validations: [{ type: "required" }],
      },
      {
        id: "feefe4e7-f64b-42dc-9d8a-9453051a0ee5",
        label: "Ótimo! Qual o seu telefone com DDD?",
        type: "text",
        placeholder: "(00) 00000-0000",
        pageIndex: 1,
        orderIndex: 3,
        mask: ["(00) 0000-0000", "(00) 00000-0000"],
        validations: [
          {
            type: "required",
            errorMessage:
              "Estou com problema de input com mask, coloque 'não' na anterior",
          },
        ],
        conditional: {
          fieldId: "89f7e8b7-3f3c-4cc3-b56b-aa45091fcff3",
          operator: "equals",
          value: "yes",
        },
      },
      // --- PÁGINA 2: USO DO PRODUTO ---
      {
        id: "85be1757-8a5b-4ba7-ba0c-839ea48af757",
        label: "Qual de nossos produtos você mais utiliza?",
        type: "select",
        placeholder: "Selecione o produto principal",
        pageIndex: 2,
        orderIndex: 0,
        validations: [{ type: "required" }],
        selectOptions: [
          { label: "Produto Alpha", value: "alpha" },
          { label: "Produto Beta", value: "beta" },
          { label: "Produto Gamma", value: "gamma" },
        ],
      },
      {
        id: "d5b752ee-1d48-41e7-adad-dd614cef1dfc",
        label:
          "Numa escala de 1 a 5, como você avalia a facilidade de uso do produto?",
        type: "rating",
        pageIndex: 2,
        orderIndex: 1,
        validations: [{ type: "required" }],
        ratingOptions: {
          min: 1,
          max: 5,
          style: "stars",
        },
      },
      {
        id: "436b8053-5c75-4067-ba83-71a638fd6a76",
        label: "Quais destas funcionalidades você já utilizou?",
        type: "checkbox_group",
        hint: "Marque todas as opções aplicáveis.",
        pageIndex: 2,
        orderIndex: 2,
        validations: [
          {
            type: "required",
            errorMessage: "Por favor, selecione ao menos uma opção.",
          },
        ],
        selectOptions: [
          {
            label: "Dashboard de Análises",
            value: "dashboard",
          },
          {
            label: "Relatórios Customizados",
            value: "reports",
          },
          {
            label: "Suporte via Chat",
            value: "chat_support",
          },
        ],
      },
      {
        id: "053bcd41-b3bf-4e47-a6bc-143d9f36ed50",
        label: "Quando você começou a usar nosso produto?",
        type: "date",
        hint: "Pode ser uma data aproximada.",
        pageIndex: 2,
        orderIndex: 3,
        validations: [
          {
            type: "max",
            options: { value: new Date().toISOString().split("T")[0] }, // Define a data máxima como hoje
            errorMessage: "A data não pode ser no futuro.",
          },
        ],
      },
      // --- PÁGINA 3: FEEDBACK DETALHADO ---
      {
        id: "19e9bd23-a1ce-4d55-a41a-18592bbc722c",
        label:
          "De 0 a 10, o quão provável você é de nos recomendar a um amigo ou colega?",
        type: "rating",
        hint: "0 = Nada provável, 10 = Com certeza!",
        pageIndex: 3,
        orderIndex: 0,
        validations: [{ type: "required" }],
        ratingOptions: {
          min: 0,
          max: 10,
          style: "slider",
        },
      },
      {
        id: "4b512b66-4a04-44d2-8597-a16245e83f05",
        label: "Ficamos felizes com a sua nota! O que mais te agradou?",
        type: "textarea",
        placeholder: "Nos conte o que te fez dar essa nota...",
        pageIndex: 3,
        orderIndex: 1,
        conditional: {
          fieldId: "19e9bd23-a1ce-4d55-a41a-18592bbc722c",
          operator: "greater_than_equal",
          value: "9",
        },
        validations: [{ type: "required" }],
      },
      {
        id: "3040a020-c389-4b4f-8277-c9d9e9eea0b6",
        label:
          "Lamentamos por não atender suas expectativas. O que podemos fazer para melhorar?",
        type: "textarea",
        placeholder: "Seu feedback é muito importante para nós...",
        pageIndex: 3,
        orderIndex: 2,
        conditional: {
          fieldId: "3040a020-c389-4b4f-8277-c9d9e9eea0b6",
          operator: "less_than_equal",
          value: "6",
        },
        validations: [{ type: "required" }],
      },
    ];
    setValue("questions", exampleQuestions); // Substitui o array de perguntas
  };

  const renumberPages = (questions: SurveyQuestion[]): SurveyQuestion[] => {
    if (questions?.length === 0) {
      return [];
    }

    const uniquePageIndexes = [
      ...new Set(questions?.map((q) => q.pageIndex)),
    ].sort((a, b) => a - b);

    const pageMap = uniquePageIndexes.reduce((acc, oldIndex, newIndex) => {
      acc[oldIndex] = newIndex + 1;
      return acc;
    }, {} as Record<number, number>);

    return questions?.map((q) => ({
      ...q,
      pageIndex: pageMap[q.pageIndex],
    }));
  };

  const addNewQuestion = (newQuestion: SurveyQuestion) => {
    const updatedQuestions = [...surveyQuestions, newQuestion];

    const renumberedQuestions = renumberPages(updatedQuestions);

    setValue("questions", renumberedQuestions, { shouldDirty: true });
    toast.success(t("createSurvey.toasts.addQuestionSuccess"));
    setNewQuestionIds((state) => [...state, newQuestion.id]);
  };

  const updateQuestion = (updatedQuestion: SurveyQuestion) => {
    const index = fields.findIndex((field) => field.id === updatedQuestion.id);
    if (index > -1) {
      update(index, updatedQuestion);
      toast.success(t("createSurvey.toasts.updateQuestionSuccess"));
    }
  };

  const deleteQuestion = (questionId: string) => {
    const currentQuestions = getValues("questions");
    const dependencyQuestion = currentQuestions.find(
      (q) => q.conditional?.fieldId === questionId
    );

    if (dependencyQuestion?.label) {
      const label = t("createSurvey.toasts.confirm", {
        dependencyQuestion: dependencyQuestion.label,
      });
      if (confirm(label)) {
        deleteQuestion(dependencyQuestion.id);
      }
    }

    const index = fields.findIndex((field) => field.id === questionId);
    if (index > -1) {
      remove(index);
      const remainingQuestions = getValues("questions");
      const renumberedQuestions = renumberPages(remainingQuestions);
      setValue("questions", renumberedQuestions);
      toast.success(t("createSurvey.toasts.deleteQuestion"));
    }
    setDeletesQuestionIds((state) => [...state, questionId]);
  };

  const handleTitleChange = (newTitle: string) => {
    setValue("title", newTitle, { shouldDirty: true });
  };

  const previewForm = useForm({ mode: "onTouched", shouldUnregister: false });
  const [isModalOpen, toggleModal] = useToggle(false);
  const [questionToEdit, setQuestionToEdit] = useState<SurveyQuestion | null>(
    null
  );

  const handleOpenToAdd = () => {
    setQuestionToEdit(null);
    toggleModal();
  };

  const handleOpenToEdit = (question: SurveyQuestion) => {
    console.log({ question });
    setQuestionToEdit(question);
    toggleModal();
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;
    const currentQuestions = getValues("questions");

    const activeContainerId = active.data.current?.sortable.containerId;
    const overContainerId = over.data.current?.sortable.containerId || over.id;

    const activeIndex = currentQuestions.findIndex((q) => q.id === active.id);
    const overIndex = currentQuestions.findIndex((q) => q.id === over.id);

    if (activeIndex === -1) return;

    if (activeContainerId !== overContainerId) {
      const newPageIndex = Number(String(overContainerId).replace("page-", ""));
      currentQuestions[activeIndex] = {
        ...currentQuestions[activeIndex],
        pageIndex: newPageIndex,
      };
    }

    const updatedQuestions = arrayMove(
      currentQuestions,
      activeIndex,
      overIndex
    );

    let finalQuestions = updatedQuestions?.map((question) => {
      const questionsOnSamePage = updatedQuestions.filter(
        (q) => q.pageIndex === question.pageIndex
      );
      const orderIndex = questionsOnSamePage.findIndex(
        (q) => q.id === question.id
      );
      return { ...question, orderIndex };
    });

    const movedItem = finalQuestions.find((q) => q.id === active.id);
    if (movedItem?.conditional) {
      const dependencyItem = finalQuestions.find(
        (q) => q.id === movedItem.conditional!.fieldId
      );
      if (dependencyItem) {
        const movedPosition = movedItem.pageIndex + movedItem.orderIndex / 100;
        const dependencyPosition =
          dependencyItem.pageIndex + dependencyItem.orderIndex / 100;
        if (movedPosition < dependencyPosition) {
          toast.error(t("createSurvey.toasts.dragError"));
          return;
        }
      }
    }

    finalQuestions = renumberPages(updatedQuestions);

    setValue("questions", finalQuestions, { shouldDirty: true });
  }

  const groupedQuestions = useMemo(() => {
    return surveyQuestions.reduce((acc, question) => {
      const page = question.pageIndex;
      if (!acc[page]) {
        acc[page] = [];
      }
      acc[page].push(question);
      acc[page].sort((a, b) => a.orderIndex - b.orderIndex);
      return acc;
    }, {} as Record<number, SurveyQuestion[]>);
  }, [surveyQuestions]);

  const { company } = useAuthStore();

  const submitFunction = (values: SurveyModel) => {
    console.log("values", values);
    if (!company?.id || !onSubmit) {
      return;
    }

    return onSubmit({
      ...values,
      deletedQuestionIds,
      newQuestionIds,
    });
  };
  const disabledCreateButton = loading || surveyQuestions?.length === 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPreviewSubmit = (data: any) => {
    console.log("Preview data:", data);
    toast.success(t("createSurvey.toasts.previewSubmit"));
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 ">
      <div className="mb-5 w-full flex flex-col md:flex-row md:justify-between items-center gap-3">
        <BackButton className="mb-2 md:mb-0">
          <EditableTitle
            initialTitle={surveyTitle}
            onSave={handleTitleChange}
            className="text-xl font-bold text-card-foreground"
          />
        </BackButton>
        <Button
          onClick={formExemple}
          size={"sm"}
          variant="secondary"
          className="mb-2 md:mb-0"
        >
          Carregar Exemplo
        </Button>

        <Button
          onClick={addSequentialForm}
          size={"sm"}
          variant="secondary"
          className="mb-2 md:mb-0"
        >
          Adicionar Formulário Sequencial
        </Button>
        <Button
          onClick={handleSubmit(submitFunction)}
          size={"sm"}
          disabled={disabledCreateButton}
        >
          {buttonSubmitText} <Check className="ml-1 h-5 w-5" />
        </Button>
      </div>

      <div className="w-full flex flex-col md:flex-row md:max-w-[90%]  gap-4 items-center justify-center ">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="w-full max-w-[600px] flex-1 min-h-[500px]  h-[calc(100vh-160px)]  overflow-y-auto flex flex-col gap-4 border p-4 rounded-lg bg-card shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-card-foreground text-xl">
                {t("createSurvey.editController.title")}
              </h4>
              <Button onClick={handleOpenToAdd} size={"sm"}>
                {t("createSurvey.buttons.addQuestion")}
                <Plus className="ml-1 h-5 w-5" />
              </Button>
            </div>
            {surveyQuestions?.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                {t("createSurvey.editController.defaultMessage")}
              </p>
            )}
            {Object.entries(groupedQuestions).map(
              ([pageIndex, questionsInPage]) => {
                const page = t("createSurvey.editController.page", {
                  page: String(pageIndex),
                });
                return (
                  <div
                    key={`page-${pageIndex}`}
                    className="p-2 border rounded-lg bg-background"
                  >
                    {pageIndex && (
                      <h3 className="font-bold mb-2 text-center text-sm text-muted-foreground">
                        {page}
                      </h3>
                    )}

                    <SortableContext
                      items={questionsInPage.map((q) => q.id)}
                      strategy={verticalListSortingStrategy}
                      id={`page-${pageIndex}`}
                    >
                      <div className="flex flex-col gap-2">
                        {questionsInPage.map((q) => (
                          <SortableQuestionItem
                            key={q.id}
                            question={q}
                            onDelete={deleteQuestion}
                            onEdit={handleOpenToEdit}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </div>
                );
              }
            )}
          </div>
        </DndContext>
        {surveyQuestions && (
          <Form {...previewForm}>
            <div className="w-full max-w-[600px] flex-1 h-[calc(100vh-160px)]">
              <QuestionsForm
                isPreview
                logoUrl={company?.logoUrl}
                questions={surveyQuestions}
                onSubmit={onPreviewSubmit}
              />
            </div>
          </Form>
        )}{" "}
      </div>
      <ServeyModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onAddQuestion={addNewQuestion}
        onUpdateQuestion={updateQuestion}
        existingQuestions={surveyQuestions || []}
        questionToEdit={questionToEdit}
      />
    </div>
  );
};
