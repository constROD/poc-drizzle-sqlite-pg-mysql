import type { Config } from 'drizzle-kit';
import { envConfig } from './env.config';
import { generateDbString } from './src/utils/generate-db-string';

export default {
  schema: './src/db/sqlite/schema.ts',
  out: './drizzle/migrations/sqlite',
  driver: 'better-sqlite',
  dbCredentials: {
    url: generateDbString({ dbType: 'sqlite', options: { database: envConfig.DB_NAME } }),
  },
  strict: true,

  /* For debugging purposes */
  verbose: true,
} satisfies Config;
