"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { Heart } from "lucide-react"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: number
    name: string
    price: number
    image1: string
    image2: string
    description: string
  }
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [currentImage, setCurrentImage] = useState(product.image1)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const isFav = isFavorite(product.id)

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image1,
    })
    onClose()
  }

  const handleFavoriteToggle = () => {
    if (isFav) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image1,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] bg-dark-800 text-gray-100 border border-dark-600">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">{product.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image src={currentImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-4 flex space-x-2">
              <button
                onClick={() => setCurrentImage(product.image1)}
                className={`w-3 h-3 rounded-full ${currentImage === product.image1 ? "bg-white" : "bg-gray-500"}`}
              />
              <button
                onClick={() => setCurrentImage(product.image2)}
                className={`w-3 h-3 rounded-full ${currentImage === product.image2 ? "bg-white" : "bg-gray-500"}`}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <motion.button
                  className={`p-2 rounded-full ${isFav ? "bg-red-500" : "bg-dark-700"}`}
                  onClick={handleFavoriteToggle}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart className={`h-5 w-5 ${isFav ? "text-white fill-current" : "text-white"}`} />
                </motion.button>
              </div>
              <p className="text-gray-400 mb-6">{product.description}</p>
              <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
            </div>
            <Button onClick={handleAddToCart} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

