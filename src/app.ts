import config from '@/config'
import prisma from '@/db/client'
import express, { type Application, type Request, type Response } from 'express'

const app: Application = express()

// Settings
app.set('port', config.PORT)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/', async (_: Request, res: Response) => {
  const slugs = await prisma.slug.findMany()

  res.status(200).json(slugs)
})

export default app
