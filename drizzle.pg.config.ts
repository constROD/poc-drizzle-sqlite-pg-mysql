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
      options: {
        user: envConfig.DB_USER,
        password: envConfig.DB_PASSWORD,
        host: envConfig.DB_HOST,
        port: envConfig.DB_PG_PORT,
        database: envConfig.DB_NAME,
      },
    }),
  },
  strict: true,

  /* For debugging purposes */
  verbose: true,
} satisfies Config;
