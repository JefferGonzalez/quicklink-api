import { findOne, remove, update } from '@/controllers/users.js'
import { validateSchema } from '@/middlewares/validator.js'
import { ProfileSchema } from '@/schemas/Profile.js'
import { Router } from 'express'

const router = Router()

router
  .get('/users/profile', findOne)
  .patch('/users/profile', validateSchema(ProfileSchema, 'body'), update)
  .delete('/users/profile', remove)

export default router
