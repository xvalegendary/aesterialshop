"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserByToken } from "@/lib/auth"

export default function AccountPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/")
    } else {
      getUserByToken(token).then((userData) => {
        if (userData) {
          setUser(userData)
        } else {
          localStorage.removeItem("token")
          router.push("/")
        }
        setLoading(false)
      })
    }
  }, [router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to view this page.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.username}!</h1>
      <div className="bg-dark-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
        <p className="mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Referral Program</h3>
          <p className="mb-2">Share your referral code with friends and earn rewards!</p>
          <div className="relative">
            <input
              type="text"
              value={user.referralCode}
              readOnly
              className="w-full p-2 bg-dark-700 rounded filter blur-sm"
            />
            <button
              onClick={() => alert("Referral program coming soon!")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Show
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

