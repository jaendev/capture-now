import { NextRequest, NextResponse } from "next/server"
import { registerSchema } from "@/src/lib/validations"
import { createUser, getUserByEmail } from "@/src/db/queries/users"
import { createDefaultTagsForUser } from "@/src/db/queries/tags"

/**
 * Method to handle user registration.
 * @param request - The incoming request object containing user registration data.
 * @returns NextResponse - A response indicating the success or failure of the registration process.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 })
    }

    const user = await createUser({ name, email, password })

    // When user is registered, tags will be created by default  
    await createDefaultTagsForUser(user.id)

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    }, { status: 201 })

  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}