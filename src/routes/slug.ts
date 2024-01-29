import { getSlug } from '@/controllers/slug'
import { Router } from 'express'

const router = Router()

router.get('/slug/:slug', getSlug)

export default router
