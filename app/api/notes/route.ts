import { NextRequest, NextResponse } from "next/server"
import { createNoteSchema, searchNotesSchema } from "@/src/lib/validations"
import { createNote, getUserNotes } from "@/src/db/queries/notes"
import { getAuthenticatedUser } from "@/src/lib/jwt-auth"

/**
 * Method to handle GET request for user notes.
 * @param request - The incoming request object.
 * @returns NextResponse - A response containing the user's notes or an error message.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const params = Object.fromEntries(searchParams.entries())

    const validatedParams = searchNotesSchema.parse(params)

    const result = await getUserNotes(user.userId, validatedParams)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Get notes error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Method to handle POST request to create a new note.
 * @param request note - The incoming request object containing note creation data.
 * @returns note - A response containing the created note or an error message.
 */
export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate the note data (including tagIds)
    const validatedData = createNoteSchema.parse(body)

    // Create note with automatic tag relationships
    const note = await createNote({
      ...validatedData,
      userId: user.userId,
      emoji: validatedData.emoji ?? "",
      tagIds: validatedData.tagIds || [],
    })

    return NextResponse.json({
      ...note,
      message: `Note created successfully${validatedData.tagIds?.length ? ` with ${validatedData.tagIds.length} tag(s)` : ''}`
    }, { status: 201 })

  } catch (error) {
    console.error("❌ Create note error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}