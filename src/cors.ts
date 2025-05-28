import env from '@/env.js'
import cors from 'cors'

export const publicCors = cors({ origin: '*', methods: ['GET', 'POST'] })

export const privateCors = cors({
  origin: env.CLIENT_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
})
