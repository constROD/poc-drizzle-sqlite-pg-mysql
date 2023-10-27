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
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
});

export const envConfig = envSchema.parse({
  STAGE: process.env.STAGE,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
});
