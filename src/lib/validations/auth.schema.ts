import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "auth.nameTooShort")
      .max(80, "auth.nameTooLong"),

    email: z
      .string()
      .email("auth.invalidEmail")
      .toLowerCase(),

    password: z
      .string()
      .min(8, "auth.passwordTooShort"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "auth.passwordNotMatch",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .email("auth.invalidEmail")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "auth.passwordRequired"),
});