import Database from 'better-sqlite3';
import { drizzle as sqliteDrizzle } from 'drizzle-orm/better-sqlite3';
import { drizzle as mysqlDrizzle } from 'drizzle-orm/mysql2';
import { drizzle as pgDrizzle } from 'drizzle-orm/node-postgres';
import mysql from 'mysql2/promise';
import { Pool } from 'pg';
import { envConfig } from '~/env.config';
import { generateDbString } from '../utils/generate-db-string';

export const DEFAULT_DB_STRING = {
  sqlite: generateDbString({ dbType: 'sqlite', options: { database: envConfig.DB_NAME } }),
  pg: generateDbString({
    dbType: 'pg',
    options: {
      user: envConfig.DB_USER,
      password: envConfig.DB_PASSWORD,
      host: envConfig.DB_HOST,
      port: envConfig.DB_PG_PORT,
      database: envConfig.DB_NAME,
    },
  }),
  mysql: generateDbString({
    dbType: 'mysql',
    options: {
      user: envConfig.DB_USER,
      password: envConfig.DB_PASSWORD,
      host: envConfig.DB_HOST,
      port: envConfig.DB_MYSQL_PORT,
      database: envConfig.DB_NAME,
    },
  }),
};

export function sqliteClient(dbString: string = DEFAULT_DB_STRING.sqlite) {
  const connection = new Database(dbString);
  return sqliteDrizzle(connection);
}

export function pgClient(dbString: string = DEFAULT_DB_STRING.pg) {
  const connection = new Pool({
    connectionString: dbString,
  });
  return pgDrizzle(connection);
}

export function mysqlClient(dbString: string = DEFAULT_DB_STRING.mysql) {
  const connection = mysql.createPool(dbString);
  return mysqlDrizzle(connection);
}
