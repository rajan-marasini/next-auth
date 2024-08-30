"use server";

import bcrypt from "bcryptjs";
import * as z from "zod";

import { RegisterSchema } from "@/schema";
import { db } from "@/lib/db";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Error validating field."
        }
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userAlreadyExist = await db.user.findUnique({
        where: {
            email
        }
    })

    if (userAlreadyExist) {
        return {
            success: false,
            message: "User Already exist"
        }
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: true, message: "Successfully registered" }

}
