"use client"

import { useEffect, useRef } from "react"

export function TextMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marqueeElement = marqueeRef.current
    if (!marqueeElement) return

    // Clone the content to create a seamless loop
    const content = marqueeElement.innerHTML
    marqueeElement.innerHTML = content + content

    // Start the animation
    const animation = marqueeElement.animate([{ transform: "translateX(0)" }, { transform: `translateX(-50%)` }], {
      duration: 30000, // Adjust speed here (milliseconds)
      iterations: Number.POSITIVE_INFINITY,
    })

    return () => {
      animation.cancel()
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full bg-black text-white py-2 z-50 overflow-hidden whitespace-nowrap">
      <div ref={marqueeRef} className="inline-block">
        FREE SHIPPING ON ALL ORDERS OVER $100 • NEW COLLECTION AVAILABLE NOW • USE CODE "WELCOME10" FOR 10% OFF YOUR
        FIRST ORDER • LIMITED EDITION ITEMS AVAILABLE • FREE SHIPPING ON ALL ORDERS OVER $100 • NEW COLLECTION AVAILABLE
        NOW • USE CODE "WELCOME10" FOR 10% OFF YOUR FIRST ORDER • LIMITED EDITION ITEMS AVAILABLE •
      </div>
    </div>
  )
}

