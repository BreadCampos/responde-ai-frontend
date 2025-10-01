import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
];
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
    logoLightUrl: z.string().url().optional().nullable(),
    darkLogoUrl: z.string().url().optional().nullable(),
    logoLightFile: z
      .any()
      .optional()
      .refine((file) => !file || file instanceof File, "Deve ser um arquivo.")
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        `O tamanho máximo é 5MB.`
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Formato de imagem inválido."
      ),
    logoDarkFile: z
      .any()
      .optional()
      .refine((file) => !file || file instanceof File, "Deve ser um arquivo.")
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        `O tamanho máximo é 5MB.`
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Formato de imagem inválido."
      ),
  }),
});

export type UpdateCompanyFormValues = z.infer<typeof updateCompanySchema>;

export const UpdateCompanyResolver = zodResolver(updateCompanySchema);
