import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { SplashScreen } from "@/components/splash-screen"
import { Logo } from "@/components/logo"
import { CustomCursor } from "@/components/custom-cursor"
import { Navbar } from "@/components/navbar"
import { CartProvider } from "@/context/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SDFM 2520 - Premium Hoodies",
  description: "Premium streetwear and comfortable hoodies",
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
          <SplashScreen />
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
            <Logo />
          </div>
          <Navbar />
          {children}
          <CartDrawer />
          <footer className="w-full py-6 px-4 bg-dark-600 text-gray-400">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 SDFM 2520. All rights reserved.</p>
            </div>
          </footer>
          <CustomCursor />
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'