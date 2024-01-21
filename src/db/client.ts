import config from '@/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: config.ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
})

export default prisma
