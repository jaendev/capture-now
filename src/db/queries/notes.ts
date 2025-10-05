import { db } from "@/src/db"
import { notesTable, tagsTable, noteTagsTable } from "@/src/db/schema"
import { CreateNoteDTO, GetUserNotes, UpdateNoteDTO } from "@/src/types/Note"
import { eq, and, or, ilike, desc, count } from "drizzle-orm"
import { createNoteTagsBatch } from "./noteTags"

/**
 * Method to create a new note in the database with optional tags.
 * @param data - The data to create a new note.
 * @returns note - The created note object with tags.
 */
export async function createNote(data: CreateNoteDTO) {
  const { tagIds, ...noteData } = data

  console.log("Creating note with data:", { ...noteData, tagIds })

  const [note] = await db
    .insert(notesTable)
    .values(noteData)
    .returning()

  console.log("Note created with ID:", note.id)

  // Step 2: Create note-tag relationships immediately
  if (tagIds && tagIds.length > 0) {
    console.log("Creating note-tag relationships for tagIds:", tagIds)

    // Create all note-tag relationships
    const noteTagRelations = await createNoteTagsBatch(note.id, tagIds)

    console.log("Relations created:", noteTagRelations)
  }

  console.log("Note creation completed")
  return note
}

/**
 * Method to retrieve a note by its ID and user ID.
 * @param id note 
 * @param userId user 
 * @returns note by ID and user ID
 */
export async function getNoteById(id: string, userId: string) {
  const [note] = await db
    .select()
    .from(notesTable)
    .where(and(
      eq(notesTable.id, id),
      eq(notesTable.userId, userId)
    ))
    .limit(1)

  return note
}

/**
 * Method to retrieve a note with its tags by ID
 * @param noteId - The ID of the note
 * @returns note with its associated tags
 */
export async function getNoteWithTagsById(noteId: string) {
  // Get the note
  const [note] = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.id, noteId))
    .limit(1)

  if (!note) {
    return null
  }

  // Get the tags for this note
  const noteTags = await db
    .select({
      tagId: tagsTable.id,
      tagName: tagsTable.name,
      tagColor: tagsTable.color,
    })
    .from(noteTagsTable)
    .innerJoin(tagsTable, eq(noteTagsTable.tagId, tagsTable.id))
    .where(eq(noteTagsTable.noteId, noteId))

  return {
    ...note,
    tags: noteTags
  }
}

/**
 * Method to retrieve notes for a user with pagination and filtering options.
 * @param data - The search notes options including user ID and pagination details.
 * @returns notes and pagination information
 */
export async function getUserNotes(userId: string, options: GetUserNotes) {
  const {
    page = 1,
    limit = 10,
    search,
    isFavorite,
    isArchived
  } = options

  const offset = (page - 1) * limit

  // Build where conditions
  const conditions = [eq(notesTable.userId, userId)]

  if (search) {
    conditions.push(
      or(
        ilike(notesTable.title, `%${search}%`),
        ilike(notesTable.content, `%${search}%`)
      )!
    )
  }

  if (typeof isFavorite === 'boolean') {
    conditions.push(eq(notesTable.isFavorite, isFavorite))
  }

  if (typeof isArchived === 'boolean') {
    conditions.push(eq(notesTable.isArchived, isArchived))
  }

  // Get total count
  const [{ total }] = await db
    .select({ total: count() })
    .from(notesTable)
    .where(and(...conditions))

  // Get notes
  const notes = await db
    .select()
    .from(notesTable)
    .where(and(...conditions))
    .limit(limit)
    .offset(offset)
    .orderBy(desc(notesTable.createdAt))

  if (!notes) {
    return null
  }

  // Get tags for each note
  const notesWithTags = await Promise.all(
    notes.map(async (note) => {
      const noteTags = await db
        .select()
        .from(noteTagsTable)
        .innerJoin(tagsTable, eq(noteTagsTable.tagId, tagsTable.id))
        .where(eq(noteTagsTable.noteId, note.id))

      console.log("Get note tags", noteTags);

      return {
        ...note,
        tags: noteTags.map(t => t.tags)
      }
    })
  )

  return {
    notes: notesWithTags,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    }
  }
}

/**
 * Method to update a note in the database.
 * @param data - The data to update the note.
 * @returns note updated - The updated note object.
 */
export async function updateNote(
  id: string,
  userId: string,
  data: UpdateNoteDTO
) {
  const [note] = await db
    .update(notesTable)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(
      eq(notesTable.id, id),
      eq(notesTable.userId, userId)
    ))
    .returning()

  return note
}

/**
 * Method to delete a note by its ID and user ID.
 * @param id - The ID of the note to delete.
 * @param userId - The ID of the user who owns the note.
 * @returns deleted note - The deleted note object.
 */
export async function deleteNote(id: string, userId: string) {
  const [note] = await db
    .delete(notesTable)
    .where(and(
      eq(notesTable.id, id),
      eq(notesTable.userId, userId)
    ))
    .returning()

  return note
}

/**
 * Method to retrieve favorite notes for a user.
 * @param userId - The ID of the user whose favorite notes to retrieve.
 * @returns notes - The list of favorite notes for the user.
 */
export async function getFavoriteNotes(userId: string) {
  const [notes] = await db
    .select()
    .from(notesTable)
    .where(and(
      eq(notesTable.userId, userId),
      eq(notesTable.isFavorite, true),
      eq(notesTable.isArchived, false)
    ))
    .orderBy(desc(notesTable.updatedAt))

  return notes
}

/**
 * Method to retrieve archived notes for a user.
 * @param userId - The ID of the user whose archived notes to retrieve.
 * @returns notes - The list of archived notes for the user.
 */
export async function getArchivedNotes(userId: string) {
  const [notes] = await db
    .select()
    .from(notesTable)
    .where(and(
      eq(notesTable.userId, userId),
      eq(notesTable.isArchived, true)
    ))
    .orderBy(desc(notesTable.updatedAt))

  return notes
}