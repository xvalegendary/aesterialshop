"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { toast } from "sonner"

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        toast.success(`Added another ${product.name} to your cart!`)
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }

      toast.success(`${product.name} added to your cart!`)
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id)
      if (item) {
        toast.info(`${item.name} removed from cart`)
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id)
      if (item && quantity !== item.quantity) {
        toast.info(`Updated ${item.name} quantity to ${quantity}`)
      }
      return prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    })
  }

  const clearCart = () => {
    setItems([])
    toast.info("Cart cleared")
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

