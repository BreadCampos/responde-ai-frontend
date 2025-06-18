import { useForm } from "react-hook-form";

import { Button } from "@/application/shared/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/application/shared/components/ui/drawer";
import { Form } from "@/application/shared/components/ui/form";

import { Eye } from "lucide-react";
import type { SurveyQuestion } from "@/application/feature/survey/model/survey.model";
import { QuestionsFormPreview } from "@/application/feature/survey/components/questions-form-preview";

interface Props {
  questions?: SurveyQuestion[];
}

export const SurveyPreviewDrawer = ({ questions }: Props) => {
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
            {questions && (
              <QuestionsFormPreview
                questions={questions}
                title=""
                className="h-[calc(100vh-100px)] rounded-lg border-0 p-4 bg-transparent shadow-none"
              />
            )}
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
