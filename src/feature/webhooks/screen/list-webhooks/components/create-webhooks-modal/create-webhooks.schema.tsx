import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createWebhooksSchema = z.object({
  url: z
    .string()
    .url({ message: "URL deve ser um URL válido" })
    .min(1, { message: "URL is required" }),
  subscribedEvents: z.array(z.string()).min(1, {
    message: "Pelo menos um evento deve ser selecionado",
  }),
  isActive: z.boolean(),
});

export type CreateWebhooksSchemaType = z.infer<typeof createWebhooksSchema>;
export const resolverCreateWebhooksSchema = zodResolver(createWebhooksSchema);
