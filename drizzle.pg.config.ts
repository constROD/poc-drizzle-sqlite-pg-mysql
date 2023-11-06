import type { Config } from 'drizzle-kit';
import { generateDbString } from '~/db/utils/generate-db-string';
import { envConfig } from '~/env';

export default {
  schema: './src/db/pg/schema.ts',
  out: './drizzle/migrations/pg',
  driver: 'pg',
  dbCredentials: {
    connectionString: generateDbString({
      dbType: 'pg',
      option: {
        user: envConfig.PG_DB_HOST,
        password: envConfig.PG_DB_HOST,
        host: envConfig.PG_DB_HOST,
        port: envConfig.PG_DB_PORT,
        database: envConfig.PG_DB_NAME
      }
    })
  },
  strict: true,

  /* For debugging purposes */
  verbose: true
} satisfies Config;
