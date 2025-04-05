// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google' // Or your chosen font
import './globals.css'
import { Providers } from './providers' // Import the theme provider

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanji Study Tool',
  description: 'Learn and quiz yourself on Kanji with dark mode!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Add suppressHydrationWarning as recommended by next-themes
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers> {/* Wrap your main content */}
          {children}
        </Providers>
      </body>
    </html>
  )
}