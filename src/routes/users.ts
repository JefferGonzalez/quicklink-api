import { findOne } from '@/controllers/users'
import { Router } from 'express'

const router = Router()

router.get('/users/profile', findOne)

export default router
