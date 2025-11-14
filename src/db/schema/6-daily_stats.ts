import { index, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./1-users";

export const dailyStatsTable = pgTable("daily_stats", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => usersTable.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  date: timestamp('date').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (table) => ({
  userIdIdx: index('idx_daily_stats_user_id').on(table.userId),
  dateIdx: index('idx_daily_stats_date').on(table.date),
}));