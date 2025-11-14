import { pgTable, uuid, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  avatar_url: varchar('avatar_url', { length: 255 }).default('/uploads/avatars/boy.png'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdateFn(() => new Date()),
  lastlogin: timestamp('last_login').notNull().defaultNow(),
});