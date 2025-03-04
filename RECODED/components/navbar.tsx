"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Github, User, ShoppingBag, Search } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { AuthModal } from "@/components/auth-modal"

export function Navbar() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const { setIsCartOpen, totalItems } = useCart()
  const router = useRouter()

  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openCart = () => {
    setIsCartOpen(true)
  }

  const handleAccountClick = () => {
    if (localStorage.getItem("token")) {
      router.push("/account")
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
      <motion.nav
        className="fixed top-10 left-0 w-full z-40 bg-dark-900"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Left side - Empty space */}
            <div className="flex-1"></div>

            {/* Center - Logo */}
            <div className="flex items-center">
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20sdfm-gDlxg0zxe6wVV9o5cISteykVa4LQhz.png"
                  alt="SDFM 2520"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">SDFM 2520</span>
            </div>

            {/* Right side - Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-1 justify-end">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-full bg-dark-800 hover:bg-dark-700 transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5 text-gray-300" />

                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-64 bg-dark-800 rounded-md shadow-lg p-2"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-dark-700 border border-dark-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-dark-800 hover:bg-dark-700 transition-colors"
              >
                <Github className="h-5 w-5 text-gray-300" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-dark-800 hover:bg-dark-700 transition-colors"
                onClick={handleAccountClick}
              >
                <User className="h-5 w-5 text-gray-300" />
              </motion.button>

              <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={openCart}>
                <div className="p-2 rounded-full bg-dark-800 hover:bg-dark-700 transition-colors">
                  <ShoppingBag className="h-5 w-5 text-gray-300" />
                </div>
                {totalItems > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-white text-dark-900 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Solid border instead of animated gradient */}
        <div className="h-0.5 bg-dark-700"></div>
      </motion.nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

