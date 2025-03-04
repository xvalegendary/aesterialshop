"use client"

import { X, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import Image from "next/image"

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, totalPrice } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-dark-800 shadow-xl transition-transform"
        style={{ transform: isCartOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-dark-600 px-6 py-4">
            <h2 className="text-xl font-semibold">Your Cart</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-auto py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <p className="text-gray-400">Your cart is empty</p>
                <Button variant="outline" className="mt-4" onClick={() => setIsCartOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="divide-y divide-dark-600 px-6">
                {items.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>

                        <div className="mt-2 flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-dark-600 px-6 py-4">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between py-2 font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="mt-4 w-full">Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

