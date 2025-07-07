import { DefaultAvatar } from "@/shared/components/avatar.index";
import { CheckboxInput, TextInput } from "@/shared/components/form";
import { useFormatValues } from "@/shared/hooks/use-formatter-form";
import { useFormContext } from "react-hook-form";

interface Props {
  title?: string;
}
export const RegisterCompanyForm = ({ title }: Props) => {
  const { watch } = useFormContext();

  const company = watch("company");
  const { handleDocumentMask } = useFormatValues();
  return (
    <div className="space-y-4">
      {title && <h3 className="text-xl font-semibold">{title}</h3>}
      <TextInput name="company.legalName" label="Razão Social" />
      <TextInput name="company.fantasyName" label="Nome Fantasia" />
      <TextInput
        name="company.document"
        label="Documento (CPF ou CNPJ)"
        onKeyPress={(e) => {
          handleDocumentMask(e);
        }}
      />
      <TextInput name="company.addressLine" label="Endereço" />

      <div className="flex-col space-y-3">
        <p>URL do Logo</p>
        <div className="flex flex-col md:flex-row  gap-2 items-center">
          {company?.logoUrl && (
            <DefaultAvatar
              src={company?.logoUrl}
              name={company?.fantasyName}
              className="size-14"
            />
          )}
          <TextInput name="company.logoUrl" />
        </div>
      </div>
      <TextInput
        name="company.theme.primary"
        label="Cor Primária do Tema"
        type="color"
      />
      <CheckboxInput
        name="company.settings.always_display_logo"
        label="Sempre Mostrar logo "
      />
    </div>
  );
};
