// This is a simple in-memory storage for demonstration purposes.
// In a real application, you'd use a proper backend for authentication.

interface User {
  id: number
  username: string
  email: string
  password: string
}

const users: User[] = []
let currentUserId = 1

export async function registerUser(username: string, email: string, password: string) {
  if (users.some((user) => user.username === username || user.email === email)) {
    return { success: false, error: "Username or email already exists" }
  }

  const newUser: User = {
    id: currentUserId++,
    username,
    email,
    password, // In a real app, you'd hash this password
  }

  users.push(newUser)
  return { success: true }
}

export async function loginUser(username: string, password: string) {
  const user = users.find((user) => user.username === username && user.password === password)

  if (user) {
    return { success: true, user: { id: user.id, username: user.username, email: user.email } }
  } else {
    return { success: false, error: "Invalid username or password" }
  }
}

export async function resetPassword(email: string) {
  const user = users.find((user) => user.email === email)

  if (user) {
    // In a real application, you would send an email with a reset link
    // For this demo, we'll just log to the console
    console.log(`Password reset requested for user: ${user.username}`)
    return { success: true }
  } else {
    return { success: false, error: "No user found with that email address" }
  }
}

