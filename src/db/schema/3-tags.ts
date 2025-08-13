import { pgTable, uuid, timestamp, varchar, unique, index } from 'drizzle-orm/pg-core';
import { usersTable } from './1-users';
import { relations } from 'drizzle-orm';

export const tagsTable = pgTable("tags", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  color: varchar({ length: 7 }).notNull().default('#8b5cf6'), // Default to a purple color
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  uniqueTagNamePerUser: unique('unique_tag_name_per_user').on(table.name, table.userId),
  userIdIdx: index('idx_tags_user_id').on(table.userId),
}));

export const tagsRelations = relations(tagsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tagsTable.userId],
    references: [usersTable.id]
  })
}));