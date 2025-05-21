import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string().email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 6 characters"),
  }),
});

export const generateOTPForLoginSchema = z.object({
  body: z.object({
    email: z.string().min(1, "Email is required"),
  }),
});

export const loginWithOtp = z.object({
  body: z.object({
    email: z.string().email().min(1, "Email is required"),
    otp: z.number().min(6),
  }),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
export type GenerateOTPForLoginSchema = z.infer<
  typeof generateOTPForLoginSchema
>;
export type loginWithOtpSchema = z.infer<typeof loginWithOtp>;
