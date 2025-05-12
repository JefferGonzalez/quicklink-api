import { initAuth } from '@/auth/index.js'
import config from '@/config.js'
import { removeAll } from '@/controllers/slug.js'
import { tokenExtractor } from '@/middlewares/cookie.js'
import { errorHandler } from '@/middlewares/errors.js'
import authRouter from '@/routes/auth.js'
import slugRouter from '@/routes/slug.js'
import slugsRouter from '@/routes/slugs.js'
import usersRouter from '@/routes/users.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Application, type Request, type Response } from 'express'
import passport from 'passport'

const app: Application = express()

initAuth()

// Settings
app.set('port', String(config.PORT))

// Middlewares
app.use(express.json())
app.use(
  cors({
    origin: config.CLIENT_URL,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  })
)
app.use(cookieParser())

// Routes
app.get('/', (_: Request, res: Response) => {
  res.redirect(config.CLIENT_URL)
})

app.use('/cron/slugs', removeAll)

app.use('/auth', authRouter)
app.use(slugRouter)
app.use(passport.authenticate('jwt', { session: false }), tokenExtractor())
app.use(usersRouter)
app.use(slugsRouter)

app.use((req: Request, res: Response) => {
  const page = config.CLIENT_URL + req.url
  res.redirect(page)
})

// Error handler
app.use(errorHandler)

export default app
