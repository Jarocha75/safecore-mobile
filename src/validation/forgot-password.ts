import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().min(1, "Zadaj e-mail.").email("Zadaj platný e-mail."),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
