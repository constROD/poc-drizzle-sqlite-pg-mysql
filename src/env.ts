import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PG_PORT: z.coerce.number(),
  DB_MYSQL_PORT: z.coerce.number(),
});

export const envConfig = envSchema.parse({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PG_PORT: process.env.DB_PG_PORT,
  DB_MYSQL_PORT: process.env.DB_MYSQL_PORT,
});
