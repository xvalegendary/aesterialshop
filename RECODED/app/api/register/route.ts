import { NextResponse } from "next/server"
import { registerUser } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }

    const result = await registerUser(name, email, password)

    if (result.success) {
      return NextResponse.json({ message: "User registered successfully" })
    } else {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in register route:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

