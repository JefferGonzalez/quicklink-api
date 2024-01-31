import { initAuth } from '@/auth'
import config from '@/config'
import { errorHandler } from '@/middlewares/errors'
import authRouter from '@/routes/auth'
import slugRouter from '@/routes/slug'
import slugsRouter from '@/routes/slugs'
import usersRouter from '@/routes/users'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { type Application, type Request, type Response } from 'express'
import passport from 'passport'
import { removeAll } from './controllers/slug'

const app: Application = express()

initAuth()

// Settings
app.set('port', config.PORT)

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
  res.send('⚙️ Set up project with PERN Stack and TypeScript')
})

app.use('/cron/slugs', removeAll)

app.use('/auth', authRouter)
app.use('/api', slugRouter)
app.use(passport.authenticate('jwt', { session: false }))
app.use('/api', usersRouter)
app.use('/api', slugsRouter)

// Error handler
app.use(errorHandler)

export default app
