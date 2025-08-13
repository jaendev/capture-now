import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  avatar_url: varchar({ length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdateFn(() => new Date()),
  last_login: timestamp('last_login').notNull().defaultNow(),
});