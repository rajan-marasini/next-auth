import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    const session = await auth();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1> Hello World </h1>
                <p>{JSON.stringify(session, null, 2)}</p>
            </div>
            {!session &&
                <Link href={"/login"}>Login </Link>
            }
            {session &&
                <form action={async () => {
                    "use server"
                    await signOut({
                        redirectTo: "/login"
                    })
                }}>
                    <Button type="submit"> Logout </Button>
                </form>
            }
        </main >
    );
}
