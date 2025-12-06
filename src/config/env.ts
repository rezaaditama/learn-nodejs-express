import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

// Load file .env
loadEnv();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables');
  const formatError = z.treeifyError(_env.error);
  console.error(JSON.stringify(formatError, null, 2));
  process.exit(1);
}

export const env = _env.data;
