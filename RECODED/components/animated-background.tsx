"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    if (isClient) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (isClient) {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [isClient])

  // Calculate gradient position based on mouse and scroll
  const gradientPosition = isClient
    ? {
        x: (mousePosition.x / window.innerWidth) * 100,
        y: ((mousePosition.y + scrollPosition) / (window.innerHeight + document.body.scrollHeight)) * 100,
      }
    : { x: 0, y: 0 }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Radial gradient that follows mouse */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${gradientPosition.x}% ${gradientPosition.y}%, rgba(30, 64, 175, 0.15), transparent 40%)`,
        }}
      />

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/5"
          initial={{
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            opacity: 0.05,
          }}
          animate={{
            x: isClient ? [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ] : [0, 0, 0],
            y: isClient ? [
              Math.random() * document.body.scrollHeight,
              Math.random() * document.body.scrollHeight,
              Math.random() * document.body.scrollHeight,
            ] : [0, 0, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20 + Math.random() * 40,
            ease: "linear",
          }}
        />
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  )
}

