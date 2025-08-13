import { notesTable } from './2-notes';
import { index, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { tagsTable } from './3-tags';

export const noteTagsTable = pgTable("note_tags", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  noteId: uuid('note_id').notNull().references(() => notesTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  tagId: uuid('tag_id').notNull().references(() => tagsTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  noteIdIdx: index('idx_note_tags_note_id').on(table.noteId),
  tagIdIdx: index('idx_note_tags_tag_id').on(table.tagId),
}));