import { sql } from 'drizzle-orm';
import { index, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const usersTable = pgTable(
  'users',
  {
    id: serial('serial').primaryKey().notNull(),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }),
    createdAt: timestamp('created_at', { precision: 6, withTimezone: true }).default(sql`now()`),
  },
  table => ({
    firstNameIdx: index('first_name_idx').on(table.firstName),
    lastNameIdx: index('last_name_idx').on(table.lastName),
    emailIdx: index('email_idx').on(table.email),
    createdAtIdx: index('created_at_idx').on(table.createdAt),
  })
);

export type User = typeof usersTable.$inferSelect;
export type CreateUser = typeof usersTable.$inferInsert;
