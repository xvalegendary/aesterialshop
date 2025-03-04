"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, ShoppingBag, Info, User, Github, Menu, X, ChevronRight, Flame, Star, Sparkles, Zap } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { AuthModal } from "@/components/auth-modal"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const { setIsCartOpen } = useCart()
  const router = useRouter()

  // Track scroll position for color animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Calculate gradient based on scroll position
  const getGradient = () => {
    const maxScroll = 1000 // Maximum scroll position to consider
    const scrollRatio = Math.min(scrollPosition / maxScroll, 1)

    // Start with dark colors and transition to more vibrant ones
    const startColor = "rgb(10, 10, 10)"
    const midColor = "rgb(20, 20, 30)"
    const endColor = "rgb(30, 30, 40)"

    if (scrollRatio < 0.5) {
      const ratio = scrollRatio * 2
      return `linear-gradient(to bottom, ${startColor} ${(1 - ratio) * 100}%, ${midColor} 100%)`
    } else {
      const ratio = (scrollRatio - 0.5) * 2
      return `linear-gradient(to bottom, ${midColor} ${(1 - ratio) * 100}%, ${endColor} 100%)`
    }
  }

  const scrollToProducts = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleAccountClick = () => {
    if (localStorage.getItem("token")) {
      router.push("/account")
    } else {
      setIsAuthModalOpen(true)
    }
    setIsOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-14 left-6 z-50 bg-dark-800 p-3 rounded-full shadow-lg hover:bg-dark-700 transition-all duration-300"
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              style={{ background: getGradient() }}
              className="fixed top-0 left-0 h-full w-80 z-50 shadow-2xl overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white/5"
                    initial={{
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                      width: Math.random() * 100 + 50,
                      height: Math.random() * 100 + 50,
                      opacity: 0.1,
                    }}
                    animate={{
                      x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
                      y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 10 + Math.random() * 20,
                      ease: "linear",
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col p-6">
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-2xl font-bold text-white">SDFM 2520</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="h-6 w-6 text-white" />
                  </button>
                </div>

                <nav className="flex-1">
                  <ul className="space-y-6">
                    <motion.li whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Link
                        href="/"
                        className="flex items-center text-lg text-white hover:text-blue-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Home className="h-6 w-6 mr-4" />
                        <span>Home</span>
                        <ChevronRight className="h-5 w-5 ml-auto opacity-50" />
                      </Link>
                    </motion.li>

                    <motion.li whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      <button
                        onClick={scrollToProducts}
                        className="flex items-center text-lg text-white hover:text-blue-400 transition-colors w-full"
                      >
                        <ShoppingBag className="h-6 w-6 mr-4" />
                        <span>Shop</span>
                        <ChevronRight className="h-5 w-5 ml-auto opacity-50" />
                      </button>
                    </motion.li>

                    <motion.li whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Link
                        href="/about"
                        className="flex items-center text-lg text-white hover:text-blue-400 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Info className="h-6 w-6 mr-4" />
                        <span>About</span>
                        <ChevronRight className="h-5 w-5 ml-auto opacity-50" />
                      </Link>
                    </motion.li>
                  </ul>

                  <div className="mt-12 pt-6 border-t border-white/10">
                    <h3 className="text-sm uppercase text-white/50 mb-4">Featured</h3>
                    <ul className="space-y-4">
                      <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link
                          href="#"
                          className="flex items-center text-white/80 hover:text-blue-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Flame className="h-5 w-5 mr-3 text-orange-500" />
                          <span>New Arrivals</span>
                        </Link>
                      </motion.li>

                      <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link
                          href="#"
                          className="flex items-center text-white/80 hover:text-blue-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Star className="h-5 w-5 mr-3 text-yellow-500" />
                          <span>Best Sellers</span>
                        </Link>
                      </motion.li>

                      <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link
                          href="#"
                          className="flex items-center text-white/80 hover:text-blue-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Sparkles className="h-5 w-5 mr-3 text-purple-500" />
                          <span>Limited Edition</span>
                        </Link>
                      </motion.li>

                      <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Link
                          href="#"
                          className="flex items-center text-white/80 hover:text-blue-400 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Zap className="h-5 w-5 mr-3 text-blue-500" />
                          <span>Sale</span>
                        </Link>
                      </motion.li>
                    </ul>
                  </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="flex space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={handleAccountClick}
                    >
                      <User className="h-5 w-5 text-white" />
                    </motion.button>

                    <motion.a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Github className="h-5 w-5 text-white" />
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      onClick={() => {
                        setIsCartOpen(true)
                        setIsOpen(false)
                      }}
                    >
                      <ShoppingBag className="h-5 w-5 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  )
}

