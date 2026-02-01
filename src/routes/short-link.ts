import {
  create,
  findAll,
  findById,
  findBySlug,
  remove,
  update
} from '@/controllers/short-link.js'
import { attachSession } from '@/middlewares/attach-session.js'
import { validateSchema } from '@/middlewares/validator.js'
import {
  QuerySchema,
  ShortLinkId,
  ShortLinkSchema,
  ShortLinkSchemaWithoutSlug
} from '@/schemas/ShortLink.js'
import { Router } from 'express'

const router = Router()

router
  .get(
    '/short-links',
    validateSchema(QuerySchema, 'query'),
    attachSession,
    findAll
  )
  .get('/short-links/slug/:slug', findBySlug)
  .get(
    '/short-links/:id',
    validateSchema(ShortLinkId, 'params'),
    attachSession,
    findById
  )
  .post(
    '/short-links',
    validateSchema(ShortLinkSchema, 'body'),
    attachSession,
    create
  )
  .patch(
    '/short-links/:id',
    validateSchema(ShortLinkId, 'params'),
    validateSchema(ShortLinkSchemaWithoutSlug, 'body'),
    attachSession,
    update
  )
  .delete(
    '/short-links/:id',
    validateSchema(ShortLinkId, 'params'),
    attachSession,
    remove
  )

export default router
