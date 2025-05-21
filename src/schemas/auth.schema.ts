import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 6 characters"),
  }),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
