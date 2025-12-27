import { NextRequest, NextResponse } from "next/server"
import { updateNoteSchema } from "@/src/lib/validations"
import { getNoteById, updateNote, deleteNote } from "@/src/db/queries/notes"
import { RouteContext } from "@/src/types/api"
import { getAuthenticatedUser } from "@/src/lib/jwt-auth"

/**
 * Method to handle GET request for a specific note.
 * @param request - The incoming request object.
 * @param param1 - The route context containing the note ID.
 * @returns note - The note object if found, or an error response.
 */
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params

    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const note = await getNoteById(id, user.userId)
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error("Get note error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Method to handle PATCH request to update a specific note.
 * @param request - The incoming request object containing the updated note data.
 * @param param1 - The route context containing the note ID.
 * @returns note - The updated note object if successful, or an error response.
 */
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params

    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = updateNoteSchema.parse(body)

    const note = await updateNote(id, user.userId, validatedData)
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json(note)
  } catch (error) {
    console.error("Update note error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

/**
 * Method to handle DELETE request to remove a specific note.
 * @param request - The incoming request object.
 * @param param1 - The route context containing the note ID.
 * @returns message - A success message if the note was deleted, or an error response.
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params

    const user = await getAuthenticatedUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const note = await deleteNote(id, user.userId)
    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Note deleted successfully" })
  } catch (error) {
    console.error("Delete note error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
