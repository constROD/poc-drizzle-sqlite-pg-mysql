import { sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey().notNull(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    email: text('email'),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
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
