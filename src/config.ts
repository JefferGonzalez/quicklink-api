import { config } from 'dotenv'

config()

export default {
  ENV: process?.env?.NODE_ENV ?? 'development',
  PORT: process?.env?.SERVER_PORT ?? 3000
}
