import type { Config } from 'drizzle-kit';
import { generateDbString } from '~/db/utils/generate-db-string';
import { envConfig } from '~/env';

export default {
  schema: './src/db/sqlite/schema.ts',
  out: './drizzle/migrations/sqlite',
  driver: 'better-sqlite',
  dbCredentials: {
    url: generateDbString({ dbType: 'sqlite', option: { database: envConfig.SQLITE_DB_NAME } })
  },
  strict: true,

  /* For debugging purposes */
  verbose: true
} satisfies Config;
