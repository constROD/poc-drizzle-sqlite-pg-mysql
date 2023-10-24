import { join } from 'path';

type DbCommonOption = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

type PgOption = DbCommonOption & {
  schema?: string;
};

type MysqlOption = DbCommonOption;

type SqliteOption = {
  database: string;
  url?: string;
};

export type GenerateDbString<TDbType extends 'pg' | 'mysql' | 'sqlite'> = {
  dbType: TDbType;
  options: TDbType extends 'pg' ? PgOption : TDbType extends 'mysql' ? MysqlOption : SqliteOption;
};

export function generateDbString<TDbType extends 'pg' | 'mysql' | 'sqlite'>({
  dbType,
  options,
}: GenerateDbString<TDbType>) {
  if (dbType === 'pg') {
    const { user, password, host, port, database, schema } = options as PgOption;
    return `postgresql://${user}:${password}@${host}:${port}/${database}${
      schema || `?schema=${schema}`
    }`;
  }

  if (dbType === 'mysql') {
    const { user, password, host, port, database } = options as MysqlOption;
    return `mysql://${user}:${password}@${host}:${port}/${database}`;
  }

  if (dbType === 'sqlite') {
    const { database, url } = options as SqliteOption;
    const databasePath = join(__dirname, '../../../databases/sqlite');

    if (url) return url;
    return `${databasePath}/${database}.db`;
  }

  throw new Error('Unknown db type');
}
