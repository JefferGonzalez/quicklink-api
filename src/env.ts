import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV !== 'production') {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),

  SERVER_PORT: z
    .string()
    .default('3000')
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(1, 'SERVER_PORT must be greater than 0')
        .max(65535, 'SERVER_PORT must be less than or equal to 65535')
    ),

  CLIENT_URL: z
    .url({ message: 'CLIENT_URL must be a valid URL' })
    .min(1, 'CLIENT_URL cannot be empty'),

  DATABASE_URL: z
    .url({ message: 'DATABASE_URL must be a valid URL' })
    .min(1, 'DATABASE_URL cannot be empty'),

  BETTER_AUTH_SECRET: z
    .string()
    .min(10, 'BETTER_AUTH_SECRET must be at least 10 characters long'),

  BETTER_AUTH_URL: z
    .url({ message: 'BETTER_AUTH_URL must be a valid URL' })
    .min(1, 'BETTER_AUTH_URL cannot be empty'),

  GITHUB_CLIENT_ID: z.string().min(1, 'GITHUB_CLIENT_ID cannot be empty'),

  GITHUB_CLIENT_SECRET: z
    .string()
    .min(1, 'GITHUB_CLIENT_SECRET cannot be empty'),

  GOOGLE_CLIENT_ID: z.string().min(1, 'GOOGLE_CLIENT_ID cannot be empty'),

  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, 'GOOGLE_CLIENT_SECRET cannot be empty'),

  CRON_SECRET: z
    .string()
    .min(10, 'CRON_SECRET must be at least 10 characters long')
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const result = z.treeifyError(parsed.error)

  console.error('❌ Invalid environment variables.')
  if (process.env.NODE_ENV !== 'production') {
    console.error(result.properties)
  }

  process.exit(1)
}

const env = parsed.data as Readonly<typeof parsed.data>

export default env
