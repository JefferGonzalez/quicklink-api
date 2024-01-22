import config from '@/config'
import slugRouter from '@/routes/slug'
import express, { type Application, type Request, type Response } from 'express'
import { errorHandler } from '@/middlewares/errors'

const app: Application = express()

// Settings
app.set('port', config.PORT)

// Middlewares
app.use(express.json())

// Routes
app.get('/', (_: Request, res: Response) => {
  res.send('⚙️ Set up project with PERN Stack and TypeScript')
})

app.use('/api', slugRouter)

// Error handler
app.use(errorHandler)

export default app
