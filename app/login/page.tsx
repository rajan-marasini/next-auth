import { SignIn } from "@/components/signin";
import Link from "next/link";

export default function() {
    return (
        <main className="flex w-full">
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl">Welcome to our website</h1>
                <p className="text-lg">Please Sign In to Continue</p>
                <p className="mt-12">Dont have an account? <Link href={"/register"} className="text-blue-600"> Register Here</Link></p>
            </div>
            <SignIn />
        </main>
    );
}
