import { config } from 'dotenv'

config()

export default {
  PORT: process?.env?.SERVER_PORT ?? 3000
}
