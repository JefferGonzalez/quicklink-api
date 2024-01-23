import { initAuth } from '@/auth'
import config from '@/config'
import { errorHandler } from '@/middlewares/errors'
import authRouter from '@/routes/auth'
import slugRouter from '@/routes/slug'
import express, { type Application, type Request, type Response } from 'express'

const app: Application = express()

initAuth()

// Settings
app.set('port', config.PORT)

// Middlewares
app.use(express.json())

// Routes
app.get('/', (_: Request, res: Response) => {
  res.send('⚙️ Set up project with PERN Stack and TypeScript')
})

app.use('/auth', authRouter)
app.use('/api', slugRouter)

// Error handler
app.use(errorHandler)

export default app
