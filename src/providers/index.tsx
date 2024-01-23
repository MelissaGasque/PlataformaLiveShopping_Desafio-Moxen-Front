"use client"
import { AuthProvider } from "@/contexts/authContext"
import { LiveProductProvider } from "@/contexts/liveProductContext"
import { ReactNode } from "react"

export const Providers = ({children}: {children: ReactNode}) => {
    return(
        <>
            <AuthProvider>
                <LiveProductProvider>
                    {children}
                </LiveProductProvider>
            </AuthProvider>
        </>
    )
}