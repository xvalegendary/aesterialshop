"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerUser, loginUser, resetPassword } from "@/lib/auth"
import { motion, AnimatePresence } from "framer-motion"

type AuthModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<"login" | "register" | "reset">("login")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (isOpen) {
      setView("login")
      setError("")
      setSuccess("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (view === "login") {
      const result = await loginUser(username, password)
      if (result.success) {
        console.log("Logged in:", result.user)
        onClose()
      } else {
        setError(result.error || "Login failed")
      }
    } else if (view === "register") {
      const result = await registerUser(username, email, password)
      if (result.success) {
        setSuccess("Registration successful! Please log in.")
        setTimeout(() => setView("login"), 2000)
      } else {
        setError(result.error || "Registration failed")
      }
    } else if (view === "reset") {
      const result = await resetPassword(email)
      if (result.success) {
        setSuccess("Password reset email sent. Please check your inbox.")
      } else {
        setError(result.error || "Password reset failed")
      }
    }
  }

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-dark-800 text-gray-100 border border-dark-600">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            {view === "login" ? "Welcome Back" : view === "register" ? "Create Account" : "Reset Password"}
          </DialogTitle>
        </DialogHeader>
        <AnimatePresence mode="wait">
          <motion.form
            key={view}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-4 mt-4"
          >
            {view !== "reset" && (
              <div className="relative">
                <Input
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-dark-700 border-dark-600 text-white placeholder-dark-400 focus:border-blue-500 focus:ring-blue-500"
                />
                <label className="absolute text-xs text-dark-400 top-0 left-3 -translate-y-1/2 px-1 bg-dark-700">
                  Username
                </label>
              </div>
            )}
            {(view === "register" || view === "reset") && (
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dark-700 border-dark-600 text-white placeholder-dark-400 focus:border-blue-500 focus:ring-blue-500"
                />
                <label className="absolute text-xs text-dark-400 top-0 left-3 -translate-y-1/2 px-1 bg-dark-700">
                  Email
                </label>
              </div>
            )}
            {view !== "reset" && (
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-dark-700 border-dark-600 text-white placeholder-dark-400 focus:border-blue-500 focus:ring-blue-500"
                />
                <label className="absolute text-xs text-dark-400 top-0 left-3 -translate-y-1/2 px-1 bg-dark-700">
                  Password
                </label>
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              {view === "login" ? "Login" : view === "register" ? "Register" : "Reset Password"}
            </Button>
          </motion.form>
        </AnimatePresence>
        <div className="mt-4 text-center text-sm">
          {view === "login" ? (
            <>
              <button onClick={() => setView("register")} className="text-blue-400 hover:underline">
                Create an account
              </button>
              <span className="mx-2">|</span>
              <button onClick={() => setView("reset")} className="text-blue-400 hover:underline">
                Forgot password?
              </button>
            </>
          ) : view === "register" ? (
            <button onClick={() => setView("login")} className="text-blue-400 hover:underline">
              Already have an account? Login
            </button>
          ) : (
            <button onClick={() => setView("login")} className="text-blue-400 hover:underline">
              Back to login
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

