"use client"

import { X, Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/context/favorites-context"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function FavoritesDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, removeFromFavorites, totalItems } = useFavorites()
  const { addToCart } = useCart()

  if (!isOpen && totalItems === 0) return null

  return (
    <>
      {/* Favorites button */}
      <motion.button
        className="fixed right-6 top-32 z-40 p-3 rounded-full bg-dark-800 shadow-lg hover:bg-dark-700 transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Heart className="h-6 w-6 text-white" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </motion.button>

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

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-800 shadow-xl z-50"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-dark-600 px-6 py-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Your Favorites
                  </h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Favorites items */}
                <div className="flex-1 overflow-auto py-4">
                  {items.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center">
                      <Heart className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="text-gray-400">Your favorites list is empty</p>
                      <Button variant="outline" className="mt-4" onClick={() => setIsOpen(false)}>
                        Continue Shopping
                      </Button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-dark-600 px-6">
                      {items.map((item) => (
                        <motion.li
                          key={item.id}
                          className="py-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center gap-4">
                            <div className="relative h-20 w-20 overflow-hidden rounded-md">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>

                              <div className="mt-2 flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                  onClick={() => {
                                    addToCart(item)
                                  }}
                                >
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeFromFavorites(item.id)}>
                              <Trash2 className="h-4 w-4 text-gray-400" />
                            </Button>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

