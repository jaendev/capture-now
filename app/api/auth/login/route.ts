import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { loginSchema } from "@/src/lib/validations"
import { getUserByEmail } from "@/src/db/queries/users"
import bcrypt from "bcryptjs"
import { NEXTAUTH_SECRET } from "@/config/config"

/**
 * Method to handle user login.
 * @param request - The incoming request object containing user login data.
 * @returns NextResponse - A response indicating the success or failure of the login process.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = loginSchema.parse(body)

    // Find user
    const user = await getUserByEmail(email)
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name
      },
      NEXTAUTH_SECRET,
      { expiresIn: "4d" }
    )

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
      }
    })

  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
