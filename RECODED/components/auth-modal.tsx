"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const endpoint = isLogin ? "/api/login" : "/api/register"
    const body = isLogin ? { email, password } : { name, email, password }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token)
          router.push("/account")
          onClose()
        } else {
          setIsLogin(true)
          setError("Registration successful. Please log in.")
        }
      } else {
        setError(data.error || "An error occurred")
      }
    } catch (error) {
      console.error("Error in auth process:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-800 text-gray-100 border border-dark-600">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {isLogin ? "Login" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {!isLogin && (
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-dark-700 border-dark-600 text-white placeholder-gray-500"
              required
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-dark-700 border-dark-600 text-white placeholder-gray-500"
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-dark-700 border-dark-600 text-white placeholder-gray-500"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
            {isLoading ? "Processing..." : isLogin ? "Login" : "Register"}
          </Button>
        </form>
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-400 hover:underline">
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </DialogContent>
    </Dialog>
  )
}

