import { create, getSlug } from '@/controllers/slug'
import { validateSchema } from '@/middlewares/validator'
import { SlugSchema } from '@/schemas/Slug'
import { Router } from 'express'

const router = Router()

router
  .get('/slug/:slug', getSlug)
  .post('/slug', validateSchema(SlugSchema, 'body'), create) // free tier

export default router
