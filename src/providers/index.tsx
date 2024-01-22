"use client"
import { AuthProvider } from "@/contexts/authContext"
import { ReactNode } from "react"

export const Providers = ({children}: {children: ReactNode}) => {
    return(
        <>
            <AuthProvider>
                {children}
            </AuthProvider>
        </>
    )
}