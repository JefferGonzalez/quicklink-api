import express, { type Application } from 'express'
import fs from 'fs'
import { dirname, resolve } from 'path'
import swaggerUi, { type SwaggerUiOptions } from 'swagger-ui-express'
import { fileURLToPath } from 'url'
import YAML from 'yaml'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const swaggerPath = resolve(__dirname, '..', 'docs', 'swagger.yaml')
const swaggerFile = fs.readFileSync(swaggerPath, 'utf8')
const swaggerSpec = YAML.parse(swaggerFile) as Record<string, unknown>

const options: SwaggerUiOptions = {
  customCssUrl: '/docs/swagger-ui/swagger-ui.css',
  customJs: [
    '/docs/swagger-ui/swagger-ui-bundle.js',
    '/docs/swagger-ui/swagger-ui-standalone-preset.js'
  ],
  customfavIcon: '/docs/favicon-32x32.png',
  customSiteTitle: 'QuickLink API | URL Shortener Backend'
}

export const setupSwagger = (app: Application): void => {
  app.use('/docs', express.static(resolve(__dirname, '..', 'public')))
  app.use('/docs', swaggerUi.serve)
  app.get('/docs', swaggerUi.setup(swaggerSpec, options))
}
