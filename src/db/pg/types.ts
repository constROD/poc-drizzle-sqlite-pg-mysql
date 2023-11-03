import { type postsTable, type usersTable } from './schema';

export type PgTable = typeof usersTable | typeof postsTable;
