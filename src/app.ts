import config from '@/config'
import express, { type Application, type Request, type Response } from 'express'

const app: Application = express()

// Settings
app.set('port', config.PORT)

app.get('/', (_: Request, res: Response) => {
  res.send('⚙️ Set up project with PERN Stack and TypeScript')
})

export default app
