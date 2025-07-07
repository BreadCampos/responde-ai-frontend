import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const updateCompanySchema = z.object({
  company: z.object({
    legalName: z.string({ message: "A razão social é obrigatória." }),
    fantasyName: z.string({ message: "O nome fantasia é obrigatório." }),
    document: z
      .string({
        required_error: "CPF/CNPJ é obrigatório.",
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length >= 11;
      }, "CPF/CNPJ deve conter no mínimo 11 caracteres.")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length <= 14;
      }, "CPF/CNPJ deve conter no máximo 14 caracteres.")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!Number(replacedDoc);
      }, "CPF/CNPJ deve conter apenas números."),
    logoUrl: z
      .string({ message: "A URL do logo é obrigatória." })
      .url({ message: "Insira uma URL válida para o logo." })
      .optional()
      .or(z.literal("")),
    addressLine: z
      .string({ message: "O endereço é obrigatório" })
      .min(10, { message: "O endereço muito curto." }),
    theme: z.object({
      primary: z.string().startsWith("#", {
        message: "A cor deve ser um código hexadecimal.",
      }),
    }),
    settings: z
      .object({
        always_display_logo: z.boolean().default(true).optional(),
      })
      .optional(),
  }),
});

export type UpdateCompanyFormValues = z.infer<typeof updateCompanySchema>;

export const UpdateCompanyResolver = zodResolver(updateCompanySchema);
