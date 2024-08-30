import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils"
import { Provider } from "@/app/provider";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    )
}

