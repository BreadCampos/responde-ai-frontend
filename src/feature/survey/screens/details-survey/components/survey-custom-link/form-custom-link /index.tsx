import { CheckboxInput, TextInput } from "@/shared/components/form";
import Modal from "@/shared/components/modal";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useFormContext } from "react-hook-form";
import { AddCustomLinkValues } from "./add-custom-link.shema";

type Props = {
  submit: (data: AddCustomLinkValues) => void;
  loading: boolean;
  open: boolean;
  onClose: () => void;
};

export const FormCustomLink = ({ loading, submit, onClose, open }: Props) => {
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
          title: "Salvar",
          loading: loading,
        }}
        title={"Adicionar Link Customizados"}
      >
        <div className="flex flex-col gap-4 p-1">
          <TextInput name="name" placeholder="Nome do link" />
          <TextInput
            name="usageLimit"
            type={"number"}
            onKeyPress={(e) => handleFormatMinMaxValue(e, 1)}
            placeholder="Limite de uso"
          />
          <CheckboxInput name={"isActive"} label={"Ativo"} />
        </div>
      </Modal>
    </>
  );
};
