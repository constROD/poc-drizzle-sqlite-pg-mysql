import type { Config } from 'drizzle-kit';
import { generateDbString } from '~/db/utils/generate-db-string';
import { envConfig } from '~/env';

export default {
  schema: './src/db/mysql/schema.ts',
  out: './drizzle/migrations/mysql',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: generateDbString({
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
