import { pgTable, uuid, timestamp, varchar, boolean, text, index } from 'drizzle-orm/pg-core';
import { usersTable } from './1-users';
import { relations } from 'drizzle-orm';

export const notesTable = pgTable("notes", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  emoji: varchar({ length: 10 }).notNull(),
  isFavorite: boolean('is_favorite').notNull().default(false),
  isArchived: boolean('is_archived').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdateFn(() => new Date()),
}, (table) => ({
  userIdIdx: index('idx_notes_user_id').on(table.userId),
  createdAtIdx: index('idx_notes_created_at').on(table.createdAt),
  updatedAtIdx: index('idx_notes_updated_at').on(table.updatedAt),
}));

export const notesRelations = relations(notesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [notesTable.userId],
    references: [usersTable.id]
  })
}));