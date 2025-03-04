import { db } from "@/src/db"
import { usersTable } from "@/src/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function registerUser(name: string, email: string, password: string) {
  try {
    // Check if user already exists
    const existingUser = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (existingUser.length > 0) {
      return { success: false, error: "Email already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase()

    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
      referralCode,
    })

    return { success: true }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, error: "An error occurred during registration" }
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email))

    if (users.length === 0) {
      return { success: false, error: "Invalid email or password" }
    }

    const user = users[0]

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: "1h" })
      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }
    } else {
      return { success: false, error: "Invalid email or password" }
    }
  } catch (error) {
    console.error("Error logging in user:", error)
    return { success: false, error: "An error occurred during login" }
  }
}

export async function getUserByToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; name: string }

    const users = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        referralCode: usersTable.referralCode,
      })
      .from(usersTable)
      .where(eq(usersTable.id, decoded.id))

    if (users.length === 0) {
      return null
    }

    return users[0]
  } catch (error) {
    console.error("Error getting user by token:", error)
    return null
  }
}

