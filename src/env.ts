import { config } from 'dotenv';
import { z } from 'zod';
import { STAGES } from './constants';

const initEnvConfig = () => {
  if (process.env.NODE_ENV === 'test') return config({ path: '.env.test' });
  return config();
};

initEnvConfig();

const envSchema = z.object({
  STAGE: z.enum([STAGES.DEV, STAGES.PROD, STAGES.TEST]).default(STAGES.DEV),
  SQLITE_DB_NAME: z.string(),
  PG_DB_NAME: z.string(),
  PG_DB_USER: z.string(),
  PG_DB_PASSWORD: z.string(),
  PG_DB_HOST: z.string(),
  PG_DB_PORT: z.coerce.number(),
  MYSQL_DB_NAME: z.string(),
  MYSQL_DB_USER: z.string(),
  MYSQL_DB_PASSWORD: z.string(),
  MYSQL_DB_HOST: z.string(),
  MYSQL_DB_PORT: z.coerce.number()
});

export const envConfig = envSchema.parse({
  STAGE: process.env.STAGE,
  SQLITE_DB_NAME: process.env.SQLITE_DB_NAME,
  PG_DB_NAME: process.env.PG_DB_NAME,
  PG_DB_USER: process.env.PG_DB_USER,
  PG_DB_PASSWORD: process.env.PG_DB_PASSWORD,
  PG_DB_HOST: process.env.PG_DB_HOST,
  PG_DB_PORT: process.env.PG_DB_PORT,
  MYSQL_DB_NAME: process.env.MYSQL_DB_NAME,
  MYSQL_DB_USER: process.env.MYSQL_DB_USER,
  MYSQL_DB_PASSWORD: process.env.MYSQL_DB_PASSWORD,
  MYSQL_DB_HOST: process.env.MYSQL_DB_HOST,
  MYSQL_DB_PORT: process.env.MYSQL_DB_PORT
});
