// components/ThemeSwitcher.tsx
'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
// Optional: Import icons if you want fancier buttons
// import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()

    // Ensure component is mounted on client before rendering UI
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // Render a placeholder or null during server rendering/initial mount
        return <div className="w-8 h-8" />; // Placeholder for spacing
    }

    const toggleTheme = () => {
        // Simple toggle: if it's currently dark (or system resolves to dark), switch to light, otherwise switch to dark.
        setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')
    }


    return (
        <div className='flex items-center gap-2'>
            {/* Simple Toggle Button */}
            <button
                aria-label="Toggle Dark Mode"
                type="button"
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                onClick={toggleTheme}
            >
                {/* Conditional Emoji/Icon */}
                {theme === 'dark' || resolvedTheme === 'dark' ? (
                    '🌙' // Moon emoji for dark
                    // <MoonIcon className="h-5 w-5 text-gray-100" />
                ) : (
                    '☀️' // Sun emoji for light
                    // <SunIcon className="h-5 w-5 text-yellow-500" />
                )}
            </button>

            {/* Optional: Buttons for specific themes */}
            {/*
       <button onClick={() => setTheme('light')} className={`p-1 rounded ${theme === 'light' ? 'bg-indigo-200' : ''}`}>☀️</button>
       <button onClick={() => setTheme('dark')} className={`p-1 rounded ${theme === 'dark' ? 'bg-indigo-700 text-white' : ''}`}>🌙</button>
       <button onClick={() => setTheme('system')} className={`p-1 rounded ${theme === 'system' ? 'bg-gray-500 text-white' : ''}`}>💻</button>
       */}
        </div>

    )
}

export default ThemeSwitcher