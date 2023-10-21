import { sql } from 'drizzle-orm';
import { datetime, index, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export * as MysqlSchema from './schema';

export const users = mysqlTable(
  'users',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }),
    createdAt: datetime('created_at', { fsp: 6 }).default(sql`CURRENT_TIMESTAMP(6)`),
  },
  table => ({
    firstNameIdx: index('first_name_idx').on(table.firstName),
    lastNameIdx: index('last_name_idx').on(table.lastName),
    emailIdx: index('email_idx').on(table.email),
    createdAtIdx: index('created_at_idx').on(table.createdAt),
  })
);

export type User = typeof users.$inferSelect;
export type CreateUser = typeof users.$inferInsert;
