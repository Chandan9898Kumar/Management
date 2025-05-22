
import { z } from "zod";
import { UserRoles } from "../types/User";

export const userSchema = z.object({
  id: z.number(),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must be less than 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(UserRoles, {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

export type UserFormValues = z.infer<typeof userSchema>;