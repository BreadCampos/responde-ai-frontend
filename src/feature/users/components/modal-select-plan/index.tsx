import Modal from "@/shared/components/modal";
import { Form } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { SelectPlanStep } from "../select-plan";

interface Props {
  onClose: () => void;
  open: boolean;
}
export const ModalSelectPlan = ({ onClose, open }: Props) => {
  const { t } = useTranslation("login");

  const methods = useForm({});
  return (
    <Form {...methods}>
      <Modal
        title={t("selectPlanModal.title")}
        open={open}
        onClose={onClose}
        className="w-full max-w-3xl h-full max-h-[90vh] overflow-y-auto"
      >
        <SelectPlanStep />
      </Modal>
    </Form>
  );
};
