import Database from 'better-sqlite3';
import { drizzle as sqliteDrizzle } from 'drizzle-orm/better-sqlite3';
import { drizzle as mysqlDrizzle } from 'drizzle-orm/mysql2';
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres';
import mysql from 'mysql2/promise';
import { Pool } from 'pg';
import { makeDbString } from '~/db/utils/make-db-string';
import { envConfig } from '~/env';

export const DEFAULT_DB_STRING = {
  sqlite: makeDbString({ dbType: 'sqlite', option: { database: envConfig.PG_DB_NAME } }),
  pg: makeDbString({
    dbType: 'pg',
    option: {
      user: envConfig.PG_DB_USER,
      password: envConfig.PG_DB_PASSWORD,
      host: envConfig.PG_DB_HOST,
      port: envConfig.PG_DB_PORT,
      database: envConfig.PG_DB_NAME
    }
  }),
  mysql: makeDbString({
    dbType: 'mysql',
    option: {
      user: envConfig.MYSQL_DB_USER,
      password: envConfig.MYSQL_DB_PASSWORD,
      host: envConfig.MYSQL_DB_HOST,
      port: envConfig.MYSQL_DB_PORT,
      database: envConfig.MYSQL_DB_NAME
    }
  })
};

export function createSqliteClient(dbString: string = DEFAULT_DB_STRING.sqlite) {
  const connection = new Database(dbString);
  return sqliteDrizzle(connection);
}

export function createPgClient(dbString: string = DEFAULT_DB_STRING.pg) {
  const connection = new Pool({
    connectionString: dbString
  });
  return pgDrizzle(connection);
}

export function createMysqlClient(dbString: string = DEFAULT_DB_STRING.mysql) {
  const connection = mysql.createPool(dbString);
  return mysqlDrizzle(connection);
}
