import { PrismaClient } from '@/db/prisma/client.js'
import env from '@/env.js'

const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
})

export default prisma
