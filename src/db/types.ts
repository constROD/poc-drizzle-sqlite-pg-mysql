import { type createMysqlClient, type createPgClient, type createSqliteClient } from './client';

export type SqliteClient = ReturnType<typeof createSqliteClient>;
export type PgClient = ReturnType<typeof createPgClient>;
export type MysqlClient = ReturnType<typeof createMysqlClient>;
