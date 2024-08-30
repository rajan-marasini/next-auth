"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginSchema } from "@/schema"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from "@/actions/login"
import toast from "react-hot-toast"
import { useState } from "react"

export function SignIn() {
    const [isPending, setIsPending] = useState(false);

    const form = useForm<z.infer<typeof LoginSchema>>({

        resolver: zodResolver(LoginSchema)
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setIsPending(true);
        try {
            const data = await login(values);
            if (data?.message) {
                return toast.error(data?.message)
            }
            toast.success("Successfully Logged In.")
        } catch (error) {
            toast.error("Something went wrong.")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full h-screen  flex items-center justify-start"
            >
                <div className="w-full max-w-[600px] space-y-6">
                    <FormField
                        control={form.control}
                        name="email"
                        disabled={isPending}
                        render={({ field }) => (

                            <FormItem>
                                <FormLabel className="text-black" >Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"

                        disabled={isPending}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-black" >Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={isPending}
                        type="submit" className="w-full"
                    >
                        SignIn
                    </Button>
                </div>
            </form>
        </Form>
    )
}
