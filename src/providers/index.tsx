"use client"
import { AuthProvider } from "@/contexts/authContext"
import { ReactNode } from "react"
import { ToastContainer } from "react-toastify"

export const Providers = ({children}: {children: ReactNode}) => {
    return(
        <>
            <AuthProvider>
                {children}
            </AuthProvider>
        </>
    )
}