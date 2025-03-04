import { NextResponse } from "next/server"
import { loginUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const result = await loginUser(email, password)

    if (result.success) {
      const response = NextResponse.json({ token: result.token, user: result.user })
      response.cookies.set("token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, // 1 hour
      })
      return response
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in login route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

