import { privateCors } from '@/cors.js'
import env from '@/env.js'
import { auth } from '@/lib/auth.js'
import { errorHandler } from '@/middlewares/errors.js'
import cronRouter from '@/routes/cron.js'
import shortLinkRouter from '@/routes/short-link.js'
import { setupSwagger } from '@/swagger.js'
import { toNodeHandler } from 'better-auth/node'
import cookieParser from 'cookie-parser'
import express, { type Application, type Request, type Response } from 'express'

const app: Application = express()

// Settings
app.set('port', String(env.SERVER_PORT))

// CORS
app.use(privateCors)

// Better Auth
app.all('/auth/{*any}', toNodeHandler(auth))

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Swagger
setupSwagger(app)

// Routes (Public)
app.get('/', (_: Request, res: Response) => {
  res.redirect(env.CLIENT_URL)
})

// Routes (Private)
app.use(cronRouter) // Vercel Cron Job

app.use(shortLinkRouter)

app.use((req: Request, res: Response) => {
  const page = env.CLIENT_URL + req.url
  res.redirect(page)
})

// Error handler
app.use(errorHandler)

export default app
