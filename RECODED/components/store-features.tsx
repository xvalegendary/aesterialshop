"use client"

import { Truck, Shield, CreditCard, RefreshCcw } from "lucide-react"
import { useState, useEffect } from "react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $100",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "We use SSL / Secure certificate",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description: "All major credit cards accepted",
  },
  {
    icon: RefreshCcw,
    title: "Free Returns",
    description: "30-day return policy for all items",
  },
]

export function StoreFeatures() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <section className="w-full py-12 bg-dark-800 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-8">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-dark-700 p-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 relative overflow-hidden group"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(200px circle at ${mousePosition.x - 200}px ${mousePosition.y - 200}px, rgba(255,255,255,.1), transparent 40%)`,
                }}
              />
              <feature.icon className="w-12 h-12 text-gray-100 mb-4 relative z-10" />
              <h3 className="text-xl font-semibold text-gray-100 mb-2 relative z-10">{feature.title}</h3>
              <p className="text-gray-400 relative z-10">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

