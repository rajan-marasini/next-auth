import { SignUp } from "@/components/signup";
import Link from "next/link";

export default function() {
    return (
        <main className="flex w-full">
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <h1 className="font-bold text-2xl">Welcome to our website</h1>
                <p className="text-lg">Please Sign Up to Continue</p>
                <p className="mt-12">Already have an account?<Link href={"/login"} className="text-blue-600"> Login here</Link></p>
            </div>
            <SignUp />
        </main>
    );
}
