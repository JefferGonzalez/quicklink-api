import { create, getSlug } from '@/controllers/slug.js'
import { validateSchema } from '@/middlewares/validator.js'
import { SlugSchema } from '@/schemas/Slug.js'
import { Router } from 'express'

const router = Router()

router
  .get('/slug/:slug', getSlug)
  .post('/slug', validateSchema(SlugSchema, 'body'), create) // free tier

export default router
