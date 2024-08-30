"use server";

import * as z from "zod";

import { LoginSchema } from "@/schema";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values)

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Invalid Fields"
        }
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        success: false,
                        message: "Invalid Credentials"
                    }
                default:
                    return {
                        success: false,
                        message: "Something went wrong."
                    }
            }
        }
        throw error;
    }
}
