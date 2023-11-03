import { relations, sql } from 'drizzle-orm';
import { datetime, index, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable(
  'users',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }),
    createdAt: datetime('created_at', { fsp: 6 }).default(sql`CURRENT_TIMESTAMP(6)`),
  },
  table => ({
    firstNameIdx: index('users_first_name_idx').on(table.firstName),
    lastNameIdx: index('users_last_name_idx').on(table.lastName),
    emailIdx: index('users_email_idx').on(table.email),
    createdAtIdx: index('users_created_at_idx').on(table.createdAt),
  })
);

export type User = typeof usersTable.$inferSelect;
export type CreateUser = typeof usersTable.$inferInsert;

export const usersRelations = relations(usersTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsTable = mysqlTable(
  'posts',
  {
    id: int('id').primaryKey().autoincrement().notNull(),
    userId: int('user_id').references(() => usersTable.id, {
      onDelete: 'cascade',
    }),
    title: varchar('title', { length: 255 }),
    content: varchar('content', { length: 255 }),
    createdAt: datetime('created_at', { fsp: 6 }).default(sql`CURRENT_TIMESTAMP(6)`),
  },
  table => ({
    userIdIdx: index('posts_user_id_idx').on(table.userId),
    titleIdx: index('posts_title_idx').on(table.title),
    contentIdx: index('posts_content_idx').on(table.content),
    createdAtIdx: index('posts_created_at_idx').on(table.createdAt),
  })
);

export type Post = typeof postsTable.$inferSelect;
export type CreatePost = typeof postsTable.$inferInsert;

export const postsRelations = relations(postsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [postsTable.userId],
    references: [usersTable.id],
  }),
}));
