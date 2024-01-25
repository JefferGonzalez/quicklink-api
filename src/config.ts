import { config } from 'dotenv'

config()

export default {
  ENV: process?.env?.NODE_ENV ?? 'development',
  PORT: process?.env?.SERVER_PORT ?? 3000,
  GITHUB_CLIENT_ID: process?.env?.GITHUB_CLIENT_ID ?? '',
  GITHUB_CLIENT_SECRET: process?.env?.GITHUB_CLIENT_SECRET ?? '',
  GITHUB_CALLBACK_URL: process?.env?.GITHUB_CALLBACK_URL ?? '',
  FAILURE_REDIRECT_URL: process?.env?.FAILURE_REDIRECT_URL ?? '',
  GOOGLE_CLIENT_ID: process?.env?.GOOGLE_CLIENT_ID ?? '',
  GOOGLE_CLIENT_SECRET: process?.env?.GOOGLE_CLIENT_SECRET ?? '',
  GOOGLE_CALLBACK_URL: process?.env?.GOOGLE_CALLBACK_URL ?? '',
  JSON_WEB_TOKEN_SECRET: process?.env?.JSON_WEB_TOKEN_SECRET ?? '',
  JSON_WEB_TOKEN_EXPIRES_IN: process?.env?.JSON_WEB_TOKEN_EXPIRES_IN ?? ''
}
