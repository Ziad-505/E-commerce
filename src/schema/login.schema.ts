import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "Please Enter a Valid Email Address." }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;