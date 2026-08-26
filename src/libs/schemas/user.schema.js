import * as z from "zod";
import { passwordRegex } from "../../constants/regex.js";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "../../constants/roles.js";

const addressSchema = z.object(
  {
    city: z.string({ error: "City is required." }).trim(),
    provice: z.string().trim().optional(),
    street: z.string().trim().optional(),
    country: z.string().trim().optional(),
  },
  { error: "Address is required." },
);

const userSchema = z.object({
  name: z
    .string({ error: "User name is required." })
    .trim()
    .check(z.minLength(3), z.maxLength(50)),
  email: z
    .email({
      error: (data) =>
        data.input ? "Invalid email address." : "Email address is required.",
    })
    .trim()
    .check(z.minLength(5), z.maxLength(100), z.lowercase()),
  password: z
    .string({ error: "Password is required." })
    .trim()
    .check(
      z.maxLength(100),
      z.regex(passwordRegex, {
        error:
          "Password must contain uppercase, lowercase, number and special characters. Length must be greater than 6.",
      }),
    ),
  roles: z.array(z.enum([ROLE_CUSTOMER, ROLE_ADMIN, ROLE_MERCHANT])).optional(),
  phone: z.string({ error: "Phone number is required." }).trim(),
  address: addressSchema,
  isActive: z.boolean().optional(),
});

export { userSchema, addressSchema };
