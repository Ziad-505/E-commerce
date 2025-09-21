import * as z from "zod";

// Keep the original simple schema that works with your API
export const addressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "cartId is required" }),
  details: z
    .string()
    .nonempty({ message: "Address is required" })
    .min(3, "Address must be at least 3 characters long"),
  city: z
    .string()
    .nonempty({ message: "City is required" })
    .min(3, "City must be at least 3 characters long"),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(/^(010|011|012|015)\d{8}$/, {
      message: "Please enter a valid Egyptian phone number",
    }),
  // Optional payment method for UI but not sent to original API
  paymentMethod: z.enum(["cash", "card"]).optional().default("cash"),
});

export type addressFormType = z.infer<typeof addressFormSchema>;

export const addressFormState = {
  success: false,
  error: {
    cartId: [],
    details: [],
    city: [],
    phone: [],
    paymentMethod: [],
  },
  message: "",
  callbackUrl: "",
};

export type addressFormStateType = {
  success: boolean;
  error: {
    cartId?: string[];
    details?: string[];
    city?: string[];
    phone?: string[];
    paymentMethod?: string[];
  };
  message: string;
  callbackUrl: string;
};