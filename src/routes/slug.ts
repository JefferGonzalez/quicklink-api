import { create, findAll, findOne, remove, update } from '@/controllers/slug'
import { validateSchema } from '@/middlewares/validator'
import { SlugId, SlugSchema, SlugSchemaWithoutSlug } from '@/schemas/Slug'
import { Router } from 'express'

const router = Router()

router
  .get('/slugs', findAll)
  .get('/slugs/:id', validateSchema(SlugId, 'params'), findOne)
  .post('/slugs', validateSchema(SlugSchema, 'body'), create)
  .patch(
    '/slugs/:id',
    validateSchema(SlugId, 'params'),
    validateSchema(SlugSchemaWithoutSlug, 'body'),
    update
  )
  .delete('/slugs/:id', validateSchema(SlugId, 'params'), remove)

export default router
