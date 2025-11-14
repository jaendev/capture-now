import { NextRequest, NextResponse } from "next/server"
import { getAuthenticatedUser } from "@/src/lib/jwt-auth"
import { updateUserSchema } from "@/src/lib/validations"
import { getUserById, updateUser } from "@/src/db/queries/users"

/**
 * Method to handle GET request for user profile.
 * @param request user - The incoming request object containing user profile data.
 * @returns user - A response containing the user's profile or an error message.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userProfile = await getUserById(user.userId)
    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Remove password from response
    const { ...safeUser } = userProfile
    return NextResponse.json(safeUser)
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Method to handle PATCH request to update user profile.
 * @param request request - The incoming request object containing user profile update data.
 * @returns user - A response containing the updated user profile or an error message.
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateUserSchema.parse(body)

    const updatedUser = await updateUser(user.userId, validatedData)
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
