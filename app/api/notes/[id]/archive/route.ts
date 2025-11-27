import { NextRequest, NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/src/lib/jwt-auth'
import { archiveNote } from '@/src/db/queries/notes'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate that the id exists
    if (!id) {
      return NextResponse.json({ error: 'Note ID is required' }, { status: 400 })
    }

    const user = await getAuthenticatedUser(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const note = await archiveNote(id, user.userId)

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 })
    }

    return NextResponse.json(note, { status: 200 })

  } catch (error) {
    console.error('Error archiving note:', error)
    return NextResponse.json(
      { error: 'Failed to archive note' },
      { status: 500 }
    )
  }
}