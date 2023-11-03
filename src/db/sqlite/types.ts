import { type postsTable, type usersTable } from './schema';

export type SqliteTable = typeof usersTable | typeof postsTable;
