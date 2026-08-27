import * as z from "zod";
import { userSchema } from "./user.schema.js";

const loginSchema = z.object({
  email: z.email({
    error: (data) =>
      data.input ? "Invalid email address." : "Email address is required.",
  }),
  password: z.string({ error: "Password is required." }),
});

const registerSchema = userSchema;

const forgotPasswordSchema = z.object({
  email: z.email({
    error: (data) =>
      data.input ? "Invalid email address." : "Email address is required.",
  }),
});

const resetPasswordSchema = z.object({
  password: z.string({ error: "Password is required." }),
  user: z.string(),
  token: z.string(),
});

export {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
