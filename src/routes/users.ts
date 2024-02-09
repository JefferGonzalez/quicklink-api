import { findOne, update } from '@/controllers/users'
import { validateSchema } from '@/middlewares/validator'
import { ProfileSchema } from '@/schemas/Profile'
import { Router } from 'express'

const router = Router()

router
  .get('/users/profile', findOne)
  .patch('/users/profile', validateSchema(ProfileSchema, 'body'), update)

export default router
