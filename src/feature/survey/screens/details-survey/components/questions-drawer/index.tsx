import { useForm } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Form } from "@/shared/components/ui/form";

import { Eye } from "lucide-react";
import type { SurveyModel } from "@/feature/survey/model/survey.model";
import { QuestionsFormPreview } from "@/feature/survey/components/questions-form-preview";

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
          </DrawerHeader>

          <Form {...form}>
            {survey && (
              <QuestionsFormPreview
                questions={survey.questions}
                title={survey?.title || "Preview"}
                className="m-2"
              />
            )}
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
