import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(1, "Enter a password!"),
});

export const registrationSchema = z.object({
  fname: z.string().min(3, "First Name is required."),
  mname: z.string().optional(),
  lname: z.string().min(3, "Last Name is required."),
  extname: z.string().optional(),
});
