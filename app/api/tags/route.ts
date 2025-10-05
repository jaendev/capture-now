import { NextRequest, NextResponse } from "next/server"
import { createTag, getUserTags, createDefaultTagsForUser } from "@/src/db/queries/tags"
import { getAuthenticatedUser } from "@/src/lib/jwt-auth"
import { createTagSchema } from "@/src/lib/validations"

/**
 * Method to get the user tags
 * @param request - Object with user data
 * @returns - Get tags
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const tags = await getUserTags(user.userId)

    return NextResponse.json(tags)
  } catch (error) {
    console.error("Get tags error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Method for create a tags
 * @param request - Object with tags data
 * @returns - Created tag
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Check if it's a request to create default tags
    if (body.createDefaults) {
      const defaultTags = await createDefaultTagsForUser(user.userId)
      return NextResponse.json(defaultTags, { status: 201 })
    }

    // Create single tag
    const validatedData = createTagSchema.parse(body)
    const tag = await createTag({
      ...validatedData,
      userId: user.userId,
    })

    return NextResponse.json(tag, { status: 201 })
  } catch (error) {
    console.error("Create tag error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}