import { useAuthStore } from "@/feature/authentication/store/use-auth.store";
import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelectPlanMutation } from "../../service/select-plan.mutation";
import { PlanID, SelectPlanStep } from "../select-plan";

interface Props {
  onClose: () => void;
  open: boolean;
}
export const ModalSelectPlan = ({ onClose, open }: Props) => {
  const { t } = useTranslation("login");

  const { accessToken } = useAuthStore();

  const selectPlan = useSelectPlanMutation();

  const methods = useForm<{ planId: PlanID }>();

  const onSubmit = ({ planId }: { planId: PlanID }) => {
    if (accessToken) {
      selectPlan
        ?.mutateAsync({
          accessToken,
          data: {
            billingPeriod: planId,
          },
        })
        .then((data) => {
          if (data?.url) window.location.href = data?.url;
        });
    }
  };
  return (
    <Form {...methods}>
      <Modal
        title={t("selectPlanModal.title")}
        open={open}
        onClose={onClose}
        primaryButton={{
          title: t("selectPlanModal.buttons.confirm"),
          onClick: methods.handleSubmit(onSubmit),
        }}
        className="w-full max-w-3xl h-full max-h-[90vh] overflow-y-auto"
      >
        <SelectPlanStep />
      </Modal>
    </Form>
  );
};
