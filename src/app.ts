import { initAuth } from '@/auth/index.js'
import { removeAll } from '@/controllers/slug.js'
import { privateCors, publicCors } from '@/cors.js'
import env from '@/env.js'
import { tokenExtractor } from '@/middlewares/cookie.js'
import { errorHandler } from '@/middlewares/errors.js'
import authRouter from '@/routes/auth.js'
import slugRouter from '@/routes/slug.js'
import slugsRouter from '@/routes/slugs.js'
import usersRouter from '@/routes/users.js'
import { setupSwagger } from '@/swagger.js'
import cookieParser from 'cookie-parser'
import express, { type Application, type Request, type Response } from 'express'
import passport from 'passport'

const app: Application = express()

initAuth()

// Settings
app.set('port', String(env.SERVER_PORT))

// Middlewares
app.use(express.json())
app.use(cookieParser())

// Swagger
setupSwagger(app)

// Routes (Public)
app.get('/', (_: Request, res: Response) => {
  res.redirect(env.CLIENT_URL)
})

app.use('/slug', publicCors)
app.use(slugRouter)

// Routes (Private)
app.use('/cron/slugs', removeAll) // Vercel Cron Job

app.use(privateCors)
app.use('/auth', authRouter)

app.use(passport.authenticate('jwt', { session: false }), tokenExtractor())
app.use(usersRouter)
app.use(slugsRouter)

app.use((req: Request, res: Response) => {
  const page = env.CLIENT_URL + req.url
  res.redirect(page)
})

// Error handler
app.use(errorHandler)

export default app
