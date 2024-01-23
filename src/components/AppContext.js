'use client'
import { SessionProvider } from 'next-auth/react'

// useSession in Navbar needs to be wrapped in SessionProvider
// This is used in layout.js
export function AppProvider({children}) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}