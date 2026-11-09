import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Zadaj e-mail.").email("Zadaj platný e-mail."),
  password: z.string().min(1, "Zadaj heslo."),
});

export type LoginFormData = z.infer<typeof loginSchema>;
