"use client";

import { Toaster } from "react-hot-toast";

export const Provider = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}
