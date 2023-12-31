import type { Config } from 'drizzle-kit';
import { makeDbString } from '~/db/utils/make-db-string';
import { envConfig } from '~/env';

export default {
  schema: './src/db/mysql/schema.ts',
  out: './drizzle/migrations/mysql',
  driver: 'mysql2',
  dbCredentials: {
    uri: makeDbString({
      dbType: 'mysql',
      option: {
        user: envConfig.MYSQL_DB_USER,
        password: envConfig.MYSQL_DB_PASSWORD,
        host: envConfig.MYSQL_DB_HOST,
        port: envConfig.MYSQL_DB_PORT,
        database: envConfig.MYSQL_DB_NAME
      }
    })
  },
  strict: true,

  /* For debugging purposes */
  verbose: true
} satisfies Config;
