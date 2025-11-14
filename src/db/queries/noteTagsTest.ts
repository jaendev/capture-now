import { db } from "@/src/db"
import { notesTable, tagsTable, noteTagsTable } from "@/src/db/schema"
import { eq, and, sql } from "drizzle-orm"

/**
 * Get a note with all its associated tags
 * This function verifies that the note-tag relationship works
 */
export async function getNoteWithTags(noteId: string, userId: string) {
  try {
    // Get the note
    const [note] = await db
      .select()
      .from(notesTable)
      .where(and(
        eq(notesTable.id, noteId),
        eq(notesTable.userId, userId)
      ))
      .limit(1)

    if (!note) {
      return null
    }

    // Get the tags for this note using JOIN
    const noteTags = await db
      .select({
        tagId: tagsTable.id,
        tagName: tagsTable.name,
        tagColor: tagsTable.color,
        noteTagId: noteTagsTable.id,
        linkedAt: noteTagsTable.createdAt
      })
      .from(noteTagsTable)
      .innerJoin(tagsTable, eq(noteTagsTable.tagId, tagsTable.id))
      .where(eq(noteTagsTable.noteId, noteId))

    return {
      ...note,
      tags: noteTags
    }
  } catch (error) {
    console.error("Error getting note with tags:", error)
    throw error
  }
}

/**
 * Get all notes for a user with their tags
 */
export async function getUserNotesWithTags(userId: string) {
  try {
    // Get all user notes
    const userNotes = await db
      .select()
      .from(notesTable)
      .where(eq(notesTable.userId, userId))

    // Get all tags for these notes in one query
    const notesWithTags = await Promise.all(
      userNotes.map(async (note) => {
        const noteTags = await db
          .select({
            tagId: tagsTable.id,
            tagName: tagsTable.name,
            tagColor: tagsTable.color,
          })
          .from(noteTagsTable)
          .innerJoin(tagsTable, eq(noteTagsTable.tagId, tagsTable.id))
          .where(eq(noteTagsTable.noteId, note.id))

        return {
          ...note,
          tags: noteTags
        }
      })
    )

    return notesWithTags
  } catch (error) {
    console.error("Error getting user notes with tags:", error)
    throw error
  }
}

/**
 * Check if a note is linked to a specific tag
 */
export async function isNoteLinkedToTag(noteId: string, tagId: string): Promise<boolean> {
  try {
    const [result] = await db
      .select()
      .from(noteTagsTable)
      .where(and(
        eq(noteTagsTable.noteId, noteId),
        eq(noteTagsTable.tagId, tagId)
      ))
      .limit(1)

    return !!result
  } catch (error) {
    console.error("Error checking note-tag link:", error)
    return false
  }
}

/**
 * Count how many notes are linked to a specific tag
 */
export async function countNotesForTag(tagId: string): Promise<number> {
  try {
    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(noteTagsTable)
      .where(eq(noteTagsTable.tagId, tagId))

    return result[0]?.count || 0
  } catch (error) {
    console.error("Error counting notes for tag:", error)
    return 0
  }
}
