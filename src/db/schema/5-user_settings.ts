import { pgTable, uuid, timestamp, index, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./1-users";

export const user_settingsTable = pgTable("user_settings", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  autoSave: boolean('auto_save').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('idx_user_settings_user_id').on(table.userId),
}));