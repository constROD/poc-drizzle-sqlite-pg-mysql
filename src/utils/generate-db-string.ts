import { join } from 'path';

type DbCommonOptions = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

type PGOptions = DbCommonOptions & {
  schema?: string;
};

type MySQlOptions = DbCommonOptions;

type SQLiteOptions = {
  database: string;
  url?: string;
};

export type GenerateDbString<TDbType extends 'pg' | 'mysql' | 'sqlite'> = {
  dbType: TDbType;
  options: TDbType extends 'pg'
    ? PGOptions
    : TDbType extends 'mysql'
    ? MySQlOptions
    : SQLiteOptions;
};

export function generateDbString<TDbType extends 'pg' | 'mysql' | 'sqlite'>({
  dbType,
  options,
}: GenerateDbString<TDbType>) {
  if (dbType === 'pg') {
    const { user, password, host, port, database, schema } = options as PGOptions;
    return `postgresql://${user}:${password}@${host}:${port}/${database}${
      schema || `?schema=${schema}`
    }`;
  }

  if (dbType === 'mysql') {
    const { user, password, host, port, database } = options as MySQlOptions;
    return `mysql://${user}:${password}@${host}:${port}/${database}`;
  }

  if (dbType === 'sqlite') {
    const { database, url } = options as SQLiteOptions;
    const databasePath = join(__dirname, '../../databases/sqlite');

    if (url) return url;
    return `${databasePath}/${database}.db`;
  }

  throw new Error('Unknown db type');
}
