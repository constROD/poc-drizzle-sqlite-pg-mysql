import { type postsTable, type usersTable } from './schema';

export type MysqlTable = typeof usersTable | typeof postsTable;
