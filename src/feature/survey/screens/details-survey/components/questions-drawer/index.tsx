import { ROUTES } from "@/core/routes/route-constants";
import { QuestionsForm } from "@/feature/survey/components/questions-form-preview";
import type { SurveyModel } from "@/feature/survey/model/survey.model";
import { Button } from "@/shared/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { Form } from "@/shared/components/ui/form";
import { useNavigation } from "@/shared/hooks/use-navigation";
import { useTranslation } from "@/shared/hooks/use-translation";
import { ExternalLink, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  survey?: SurveyModel;
}

export const SurveyPreviewDrawer = ({ survey }: Props) => {
  const { t } = useTranslation("surveys");
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const navigate = useNavigation();

  const redirectToForm = () => {
    if (!survey?.id) return;
    return navigate.push(ROUTES.SURVEY_RESPONSE.replace(":id", survey?.id));
  };

  const onPreviewSubmit = () => {
    toast.success(t("surveyDetails.previewDrawer.submitSuccessToast"));
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Eye className="mr-2 h-4 w-4" />{" "}
          {t("surveyDetails.previewDrawer.previewButton")}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle className="text-card-foreground">
              {t("surveyDetails.previewDrawer.drawerTitle")}
            </DrawerTitle>
            <DrawerDescription>
              {t("surveyDetails.previewDrawer.drawerDescription")}
            </DrawerDescription>
            <Button
              onClick={redirectToForm}
              variant={"link"}
              className="text-card-foreground w-fit text-start flex justify-start "
            >
              <ExternalLink />
              {t("surveyDetails.previewDrawer.viewPageLink")}
            </Button>
          </DrawerHeader>

          <Form {...form}>
            {survey && (
              <QuestionsForm
                isPreview
                questions={survey.questions}
                title={
                  survey?.title ||
                  t("surveyDetails.previewDrawer.fallbackTitle")
                }
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
