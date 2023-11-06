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
        user: envConfig.DB_USER,
        password: envConfig.DB_PASSWORD,
        host: envConfig.DB_HOST,
        port: envConfig.DB_MYSQL_PORT,
        database: envConfig.DB_NAME
      }
    })
  },
  strict: true,

  /* For debugging purposes */
  verbose: true
} satisfies Config;
