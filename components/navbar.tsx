"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Github, User, Home, ShoppingBag, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartIcon } from "@/components/cart-icon"
import { useCart } from "@/context/cart-context"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const { setIsCartOpen, totalItems } = useCart()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openCart = () => {
    setIsCartOpen(true)
  }

  const scrollToProducts = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-dark-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Left side - Hamburger menu for mobile */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-gray-100">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Center - Logo placeholder (already in layout) */}
          <div className="invisible lg:visible">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <button
                  onClick={scrollToProducts}
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Shop
                </button>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side - GitHub, Login, Cart */}
          <div className="flex items-center space-x-4">
            <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="text-gray-100">
                <Github className="h-5 w-5" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="text-gray-100" onClick={() => setIsAuthModalOpen(true)}>
              <User className="h-5 w-5" />
            </Button>

            <div className="relative" onClick={openCart}>
              <CartIcon />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-dark-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-dark-800 py-4">
            <div className="container mx-auto px-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className="text-gray-300 hover:text-white transition-colors flex items-center py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </li>
                <li>
                  <button
                    onClick={scrollToProducts}
                    className="text-gray-300 hover:text-white transition-colors flex items-center py-2 w-full text-left"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Shop
                  </button>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-white transition-colors flex items-center py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

