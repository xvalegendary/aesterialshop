"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useFavorites } from "@/context/favorites-context"
import { ProductModal } from "@/components/product-modal"
import { Heart } from "lucide-react"
import { motion } from "framer-motion"

interface HoodieCardProps {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  description: string
}

export function HoodieCard({ id, name, price, image1, image2, description }: HoodieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const isFav = isFavorite(id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart({
      id,
      name,
      price,
      image: image1,
    })
  }

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isFav) {
      removeFromFavorites(id)
    } else {
      addToFavorites({
        id,
        name,
        price,
        image: image1,
      })
    }
  }

  return (
    <>
      <motion.div
        className="bg-dark-800 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -5 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-square">
          <Image
            src={isHovered ? image2 : image1}
            alt={name}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Favorite button */}
          <motion.button
            className={`absolute top-2 right-2 p-2 rounded-full ${isFav ? "bg-red-500" : "bg-dark-700/80"}`}
            onClick={handleFavoriteToggle}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart className={`h-4 w-4 ${isFav ? "text-white fill-current" : "text-white"}`} />
          </motion.button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-100">{name}</h3>
          <p className="text-gray-400 mb-4">${price.toFixed(2)}</p>
          <Button className="w-full" variant="outline" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
      </motion.div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ id, name, price, image1, image2, description }}
      />
    </>
  )
}

