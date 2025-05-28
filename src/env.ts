import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV !== 'production') {
  config()
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production'], {
      required_error: 'NODE_ENV is required',
      invalid_type_error:
        'NODE_ENV must be either "development" or "production"'
    })
    .default('development'),

  SERVER_PORT: z
    .string({
      required_error: 'SERVER_PORT is required',
      invalid_type_error: 'SERVER_PORT must be a string'
    })
    .default('3000')
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .int()
        .min(1, 'SERVER_PORT must be greater than 0')
        .max(65535, 'SERVER_PORT must be less than or equal to 65535')
    ),

  DATABASE_URL: z
    .string({ required_error: 'DATABASE_URL is required' })
    .url('DATABASE_URL must be a valid URL')
    .min(1, 'DATABASE_URL cannot be empty'),

  DIRECT_URL: z.string().url('DIRECT_URL must be a valid URL').optional(),

  GITHUB_CLIENT_ID: z
    .string({ required_error: 'GITHUB_CLIENT_ID is required' })
    .min(1, 'GITHUB_CLIENT_ID cannot be empty'),

  GITHUB_CLIENT_SECRET: z
    .string({ required_error: 'GITHUB_CLIENT_SECRET is required' })
    .min(1, 'GITHUB_CLIENT_SECRET cannot be empty'),

  GITHUB_CALLBACK_URL: z
    .string({ required_error: 'GITHUB_CALLBACK_URL is required' })
    .url('GITHUB_CALLBACK_URL must be a valid URL'),

  FAILURE_REDIRECT_URL: z
    .string({ required_error: 'FAILURE_REDIRECT_URL is required' })
    .url('FAILURE_REDIRECT_URL must be a valid URL'),

  GOOGLE_CLIENT_ID: z
    .string({ required_error: 'GOOGLE_CLIENT_ID is required' })
    .min(1, 'GOOGLE_CLIENT_ID cannot be empty'),

  GOOGLE_CLIENT_SECRET: z
    .string({ required_error: 'GOOGLE_CLIENT_SECRET is required' })
    .min(1, 'GOOGLE_CLIENT_SECRET cannot be empty'),

  GOOGLE_CALLBACK_URL: z
    .string({ required_error: 'GOOGLE_CALLBACK_URL is required' })
    .url('GOOGLE_CALLBACK_URL must be a valid URL'),

  JSON_WEB_TOKEN_SECRET: z
    .string({ required_error: 'JSON_WEB_TOKEN_SECRET is required' })
    .min(10, 'JSON_WEB_TOKEN_SECRET must be at least 10 characters long'),

  SESSION_AGE: z
    .string()
    .default('86400000')
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().int().min(1, 'SESSION_AGE must be a positive number')),

  COOKIE_HTTP_ONLY: z
    .string()
    .transform((val) => val === 'true')
    .default('true'),

  COOKIE_PATH: z.string().default('/'),

  COOKIE_SAME_SITE: z.enum(['strict', 'lax', 'none']).default('strict'),

  COOKIE_SECURE: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),

  COOKIE_DOMAIN: z.string().default('localhost'),

  CLIENT_URL: z.string().url('CLIENT_URL must be a valid URL').default('')
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const validationErrors = parsed.error.flatten().fieldErrors

  console.error('❌ Invalid environment variables.')
  if (process.env.NODE_ENV !== 'production') {
    console.error(validationErrors)
  }

  process.exit(1)
}

const env = parsed.data as Readonly<typeof parsed.data>

export default env
