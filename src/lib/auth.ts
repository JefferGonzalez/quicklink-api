import prisma from '@/db/client.js'
import env from '@/env.js'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const auth = betterAuth({
  basePath: '/auth',
  trustedOrigins: [env.CLIENT_URL],
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  user: {
    deleteUser: {
      enabled: true
    }
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }
  }
})
