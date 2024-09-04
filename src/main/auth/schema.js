import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(1, "Enter a password!"),
});
