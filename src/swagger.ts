import { type Application } from 'express'
import fs from 'fs'
import { dirname, resolve } from 'path'
import swaggerUi from 'swagger-ui-express'
import { fileURLToPath } from 'url'
import YAML from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const swaggerPath = resolve(__dirname, '..', 'docs', 'swagger.yaml')

const swaggerFile = fs.readFileSync(swaggerPath, 'utf8')
const swaggerSpec = YAML.parse(swaggerFile) as Record<string, unknown>

export const setupSwagger = (app: Application): void => {
  app.use('/docs', swaggerUi.serve)
  app.get('/docs', swaggerUi.setup(swaggerSpec))
}
