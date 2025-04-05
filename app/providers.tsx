// app/providers.tsx
'use client' // <-- Make this component a Client Component

import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
    // Ensure ThemeProvider only renders on the client to avoid hydration mismatch
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // Render children directly on the server/initial mount
        // Or a loading state if preferred
        return <>{children}</>
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}