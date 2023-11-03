import { type mysqlClient, type pgClient, type sqliteClient } from './client';

export type SqliteClient = ReturnType<typeof sqliteClient>;
export type PgClient = ReturnType<typeof pgClient>;
export type MysqlClient = ReturnType<typeof mysqlClient>;
