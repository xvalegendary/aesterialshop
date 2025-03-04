import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { SplashScreen } from "@/components/splash-screen"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { CartProvider } from "@/context/cart-context"
import { FavoritesProvider } from "@/context/favorites-context"
import { CartDrawer } from "@/components/cart-drawer"
import { FavoritesDrawer } from "@/components/favorites-drawer"
import { NotificationsPanel } from "@/components/notifications"
import { TextMarquee } from "@/components/text-marquee"
import { Sidebar } from "@/components/sidebar"
import { AnimatedBackground } from "@/components/animated-background"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SDFM 2520 - Premium Hoodies",
  description: "Premium streetwear and comfortable hoodies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-dark-900 text-gray-100`}>
        <CartProvider>
          <FavoritesProvider>
            <SplashScreen />
            <AnimatedBackground />
            <TextMarquee />
            <Navbar />
            <Sidebar />
            <div className="pt-28">{children}</div>
            <CartDrawer />
            <FavoritesDrawer />
            <NotificationsPanel />
            <footer className="w-full py-6 px-4 bg-dark-600 text-gray-400">
              <div className="container mx-auto text-center">
                <p>&copy; 2023 SDFM 2520. All rights reserved.</p>
              </div>
            </footer>
            <CustomCursor />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1A1A1A",
                  color: "#FFFFFF",
                  border: "1px solid #252525",
                },
              }}
            />
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'