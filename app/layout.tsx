import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import RegisterServiceWorker from "./register-sw"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Streetstyle - Trinidad & Tobago Food Reviews",
  description: "Discover the best street food in Trinidad and Tobago with authentic reviews from local food lovers.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192x192.png", sizes: "192x192" },
      { url: "/icon-512x512.png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Streetstyle",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  themeColor: "#ff3333",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FavoritesProvider>
          <LanguageProvider>
            <RegisterServiceWorker />
            {children}
          </LanguageProvider>
        </FavoritesProvider>
      </body>
    </html>
  )
}
