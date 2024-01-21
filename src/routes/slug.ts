import { create, findAll, findOne, remove, update } from '@/controllers/slug'
import { Router } from 'express'

const router = Router()

router
  .get('/slugs', findAll)
  .get('/slugs/:id', findOne)
  .post('/slugs', create)
  .patch('/slugs/:id', update)
  .delete('/slugs/:id', remove)

export default router
