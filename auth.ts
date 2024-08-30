import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "./schema"
import { db } from "./lib/db"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            authorize: async (credentials) => {
                const validatedField = LoginSchema.safeParse(credentials);
                if (validatedField.success) {
                    const { email, password } = validatedField.data;

                    const user = await db.user.findUnique({ where: { email } });

                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordMatched = await bcrypt.compare(password, user.password)
                    if (passwordMatched) {
                        return user;
                    }
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
})
