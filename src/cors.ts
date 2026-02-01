import env from '@/env.js'
import cors from 'cors'

export const privateCors = cors({
  origin: env.CLIENT_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
})
