"use server";

import { formStateType, registerFormSchema } from "@/schema/register.schem";

export async function handleRegister(
    prevState: formStateType, 
    formData: FormData
): Promise<formStateType> {
    const formValues = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        rePassword: formData.get('rePassword'),
        phone: formData.get('phone')
    }

    const parsedData = registerFormSchema.safeParse(formValues);

    if(!parsedData.success){
        return {
            success: false,
            error: parsedData.error.flatten().fieldErrors,
            message: "Please fix the validation errors"
        }
    }

    try {
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formValues)
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            return {
                success: false,
                error: {},
                message: data.message || "Registration failed"
            }
        }

        return {
            success: true,
            error: {},
            message: data.message || "Registration successful"
        };
        
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: {},
            message: "An unexpected error occurred. Please try again later."
        };
    }
}