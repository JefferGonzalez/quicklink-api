import cors from 'cors'
import config from '@/config.js'

export const publicCors = cors({ origin: '*', methods: ['GET', 'POST'] })

export const privateCors = cors({
  origin: config.CLIENT_URL,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
})
