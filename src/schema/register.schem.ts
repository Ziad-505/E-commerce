import * as z from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, "Name must be at least 3 characters long"),
    email: z
      .string()
      .email({ message: "Please Enter a Valid Email Address." }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    rePassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters long" }),
    phone: z
      .string()
      .nonempty({ message: "Phone is required" })
      .regex(/^(010|011|012|015)\d{8}$/, {
        message: "Please enter a valid Egyptian phone number",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const formState: formStateType = {
  success: false,
  error: {},
  message: ""
};

export type formStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string;
};