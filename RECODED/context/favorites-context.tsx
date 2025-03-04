"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { toast } from "sonner"

export interface FavoriteItem {
  id: number
  name: string
  price: number
  image: string
}

interface FavoritesContextType {
  items: FavoriteItem[]
  addToFavorites: (product: FavoriteItem) => void
  removeFromFavorites: (id: number) => void
  isFavorite: (id: number) => boolean
  totalItems: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([])

  const addToFavorites = (product: FavoriteItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // If already in favorites, don't add again
        toast.info(`${product.name} is already in your favorites!`)
        return prevItems
      }

      // Add to favorites and show toast
      toast.success(`${product.name} added to favorites!`)
      return [...prevItems, product]
    })
  }

  const removeFromFavorites = (id: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id)
      if (item) {
        toast.info(`${item.name} removed from favorites`)
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  const isFavorite = (id: number) => {
    return items.some((item) => item.id === id)
  }

  const totalItems = items.length

  return (
    <FavoritesContext.Provider
      value={{
        items,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        totalItems,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}

