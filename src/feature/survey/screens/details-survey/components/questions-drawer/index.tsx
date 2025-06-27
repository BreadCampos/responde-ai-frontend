import { useForm } from "react-hook-form";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Form } from "@/shared/components/ui/form";

import { ExternalLink, Eye } from "lucide-react";
import type { SurveyModel } from "@/feature/survey/model/survey.model";
import { QuestionsForm } from "@/feature/survey/components/questions-form-preview";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/core/routes/route-constants";
import { Button } from "@/shared/components/button";
import { toast } from "sonner";

interface Props {
  survey?: SurveyModel;
}

export const SurveyPreviewDrawer = ({ survey }: Props) => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const navigate = useRouter();

  const redirectToForm = () => {
    if (!survey?.id) return;
    return navigate.push(ROUTES.SURVEY_RESPONSE.replace(":id", survey?.id));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPreviewSubmit = (data: any) => {
    console.log("Preview data:", data);
    toast.success("Dados do questionário enviados com sucesso!");
  };
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" /> Perguntas
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="text-card-foreground">
              Questionário atual
            </DrawerTitle>
            <DrawerDescription>
              Esta é uma pré-visualização de como seu formulário está aparecendo
              para os usuários.
            </DrawerDescription>
            <Button
              onClick={redirectToForm}
              variant={"link"}
              className="text-card-foreground w-fit text-start flex justify-start "
            >
              <ExternalLink />
              ver pagina
            </Button>
          </DrawerHeader>

          <Form {...form}>
            {survey && (
              <QuestionsForm
                isPreview
                questions={survey.questions}
                title={survey?.title || "Preview"}
                onSubmit={onPreviewSubmit}
                className="m-2 mb-5  h-[calc(100vh-190px)]"
              />
            )}
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
