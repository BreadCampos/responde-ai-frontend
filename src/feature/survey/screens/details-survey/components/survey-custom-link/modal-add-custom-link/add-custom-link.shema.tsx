import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const addCustomLinkSchema = z.object({
  isActive: z.boolean().optional().default(true),
  name: z.string().min(1, { message: "O nome do link é obrigatório." }),
  usageLimit: z
    .number()
    .int()
    .min(1, { message: "O limite de uso deve ser um número positivo." })
    .optional()
    .default(1),
});

export type AddCustomLinkValues = z.input<typeof addCustomLinkSchema>;
export type AddCustomLinkSchema = z.output<typeof addCustomLinkSchema>;

export const addCustomLinkResolver = zodResolver(addCustomLinkSchema);
