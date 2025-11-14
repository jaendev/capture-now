import { db } from "@/src/db"
import { noteTagsTable } from "@/src/db/schema"
import { eq, and } from "drizzle-orm"

/**
 * Interface for creating note-tag relationships
 */
export interface CreateNoteTagDTO {
  noteId: string;
  tagId: string;
}

/**
 * Create a single note-tag relationship
 */
export async function createNoteTag(data: CreateNoteTagDTO) {
  const [noteTag] = await db
    .insert(noteTagsTable)
    .values(data)
    .returning()

  return noteTag
}

/**
 * Create multiple note-tag relationships for a note in notes_tags table
 */
export async function createNoteTagsBatch(noteId: string, tagIds: string[]) {
  if (tagIds.length === 0) return []

  console.log(`🔗 Creating ${tagIds.length} relationships in NOTES_TAGS table for note: ${noteId}`)
  console.log("🏷️ Tag IDs to link:", tagIds)

  // Prepare data for batch insert into notes_tags table
  const noteTagsData = tagIds.map(tagId => ({
    noteId,
    tagId
  }))

  console.log("📝 Data to insert into notes_tags table:", noteTagsData)

  try {
    // Insert all relationships in notes_tags table
    const noteTags = await db
      .insert(noteTagsTable) // This targets the "notes_tags" table
      .values(noteTagsData)
      .returning()

    console.log("✅ SUCCESS: Created relationships in notes_tags table:", noteTags.length)
    console.log("🔗 Relations created:", noteTags.map(nt => ({ noteId: nt.noteId, tagId: nt.tagId })))

    return noteTags
  } catch (error) {
    console.error("❌ ERROR: Failed to create relationships in notes_tags table:", error)
  }
}

/**
 * Get all tags for a specific note
 */
export async function getTagsForNote(noteId: string) {
  const result = await db
    .select({
      id: noteTagsTable.id,
      tagId: noteTagsTable.tagId,
      noteId: noteTagsTable.noteId,
      createdAt: noteTagsTable.createdAt
    })
    .from(noteTagsTable)
    .where(eq(noteTagsTable.noteId, noteId))

  return result
}

/**
 * Remove all tags from a note
 */
export async function removeAllTagsFromNote(noteId: string) {
  await db
    .delete(noteTagsTable)
    .where(eq(noteTagsTable.noteId, noteId))
}

/**
 * Remove specific tag from a note
 */
export async function removeTagFromNote(noteId: string, tagId: string) {
  await db
    .delete(noteTagsTable)
    .where(and(
      eq(noteTagsTable.noteId, noteId),
      eq(noteTagsTable.tagId, tagId)
    ))
}

/**
 * Update note tags (remove all existing and add new ones)
 */
export async function updateNoteTags(noteId: string, tagIds: string[]) {
  // Remove all existing tags
  await removeAllTagsFromNote(noteId)

  // Add new tags
  if (tagIds.length > 0) {
    return await createNoteTagsBatch(noteId, tagIds)
  }

  return []
}