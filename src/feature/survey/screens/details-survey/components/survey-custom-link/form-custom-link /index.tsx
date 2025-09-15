import { CheckboxInput, TextInput } from "@/shared/components/form";
import Modal from "@/shared/components/modal";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { AddCustomLinkValues } from "./add-custom-link.shema";

type Props = {
  submit: (data: AddCustomLinkValues) => void;
  loading: boolean;
  open: boolean;
  onClose: () => void;
  title: string;
};

export const FormCustomLink = ({
  loading,
  submit,
  onClose,
  title,
  open,
}: Props) => {
  const { t } = useTransition("surveys");
  const methods = useFormContext<AddCustomLinkValues>();

  const { handleFormatMinMaxValue } = useFormatValues();

  const onSubmit = (data: AddCustomLinkValues) => {
    submit(data);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        className="min-w-2xl"
        primaryButton={{
          onClick: methods.handleSubmit(onSubmit),
          title: t("surveyDetails.customLink.form.buttons.createLink"),
        }}
        loading={loading}
        title={title}
      >
        <div className="flex flex-col gap-4 p-1">
          <TextInput
            name="name"
            placeholder={t(
              "surveyDetails.customLink.form.fields.name.placeholder"
            )}
            label={t("surveyDetails.customLink.form.fields.usageLimit.label")}
          />
          <TextInput
            name="usageLimit"
            type={"number"}
            onKeyPress={(e) => handleFormatMinMaxValue(e, 1)}
            placeholder={t(
              "surveyDetails.customLink.form.fields.usageLimit.placeholder"
            )}
            label={t("surveyDetails.customLink.form.fields.usageLimit.label")}
          />
          <CheckboxInput
            name={"isActive"}
            label={t("surveyDetails.customLink.form.fields.isActive.label")}
          />
        </div>
      </Modal>
    </>
  );
};
