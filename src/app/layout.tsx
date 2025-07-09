/**
 * RootLayout.tsx
 *
 * This is the root layout component for the Next.js App Router structure.
 * It wraps all pages and components in a shared HTML structure.
 *
 * Key Features:
 * - Sets HTML `lang="en"` for accessibility and SEO
 * - Applies global styles via `globals.css`
 * - Uses `antialiased` class to enhance text rendering
 * - Supports `suppressHydrationWarning` to prevent hydration mismatch warnings
 * - Reserved space for custom fonts (Geist, Geist_Mono) via `next/font/google`
 *
 * Metadata:
 * - Basic metadata defined for the page (title, description) used by Next.js
 */
"use client"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DisableRightClick from "@/DisableRightClick";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased`} suppressHydrationWarning
            > 
                <DisableRightClick/>
                {children}
            </body>
        </html>
    );
}
