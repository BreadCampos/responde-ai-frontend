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

export const signupWithCompanySchema = z
  .object({
    user: z.object({
      firstName: z.string({ message: "O nome é obrigatório." }),
      lastName: z.string({ message: "O sobrenome é obrigatório." }),
      email: z
        .string({ message: "O e-mail é obrigatório." })
        .email({ message: "Insira um e-mail válido." }),
      password: z
        .string({ message: "A senha é obrigatória." })
        .min(8, { message: "A senha precisa de no mínimo 8 caracteres." }),
      passwordConfirmation: z
        .string({ message: "A confirmação de senha é obrigatória." })
        .min(8, { message: "Confirme sua senha." }),
    }),
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
      logoLightFile: z
        .any()
        .refine((file) => !!file, "O logo para o tema claro é obrigatório.") // Garante que o arquivo não seja nulo/undefined
        .refine(
          (file) => file && file.size <= MAX_FILE_SIZE,
          `O tamanho máximo é 5MB.`
        ) // Adiciona a verificação aqui
        .refine(
          (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), // E aqui
          "Formato de imagem inválido."
        ),
      logoDarkFile: z
        .any()
        .refine((file) => !!file, "O logo para o tema escuro é obrigatório.") // Garante que o arquivo não seja nulo/undefined
        .refine(
          (file) => file && file.size <= MAX_FILE_SIZE,
          `O tamanho máximo é 5MB.`
        ) // Adiciona a verificação aqui
        .refine(
          (file) => file && ACCEPTED_IMAGE_TYPES.includes(file.type), // E aqui
          "Formato de imagem inválido."
        ),
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
    planId: z
      .string({ message: "O plano é obrigatório." })
      .min(1, { message: "Selecione um plano." }),
  })
  .refine((data) => data.user.password === data.user.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["user", "passwordConfirmation"],
  });

export type SignupWithCompanyFormValues = z.infer<
  typeof signupWithCompanySchema
>;

export const signupWithCompanyResolver = zodResolver(signupWithCompanySchema);
