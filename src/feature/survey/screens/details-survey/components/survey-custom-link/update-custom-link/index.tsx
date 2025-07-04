import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import {
  addCustomLinkResolver,
  AddCustomLinkValues,
} from "../form-custom-link /add-custom-link.shema";
import { UpdateSurveyCustomLinkMutation } from "@/feature/survey/service/update-survey-custom-link.mutation";
import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import { useParams } from "next/navigation";
import { FormCustomLink } from "../form-custom-link ";
import { useToggle } from "@/shared/hooks/use-toggle";
import { Button } from "@/shared/components/button";
import { SurveyCustomLink } from "@/feature/survey/model/survey-custom-link";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  customLink: SurveyCustomLink | null;
}
export const ModalUpdateCustomLink = ({ customLink, onClose, open }: Props) => {
  const { surveyId } = useParams<{ surveyId: string }>();

  const methods = useForm<AddCustomLinkValues>({
    resolver: addCustomLinkResolver,
    defaultValues: {
      name: "",
      usageLimit: 1,
      isActive: true,
    },
  });

  const { reset } = methods;
  const { company } = useAuthStore();
  const { mutate, isPending } = UpdateSurveyCustomLinkMutation();

  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmit = (data: AddCustomLinkValues) => {
    if (!surveyId || !company?.id || !customLink?.id) {
      return;
    }
    mutate({
      customLinkId: customLink?.id || "",
      surveyId: surveyId,
      companyId: company?.id,
      customLinkPayload: {
        isActive: data.isActive || false,
        name: data.name,
        usageLimit: data.usageLimit || 1,
      },
    });

    handleClose();
  };

  useEffect(() => {
    if (open && customLink) {
      reset({
        name: customLink.name,
        usageLimit: customLink.usageLimit,
        isActive: customLink.isActive,
      });
    }
  }, [customLink, reset, open]);

  return (
    <Form {...methods}>
      <FormCustomLink
        submit={onSubmit}
        loading={isPending}
        open={open}
        onClose={handleClose}
      />
    </Form>
  );
};
