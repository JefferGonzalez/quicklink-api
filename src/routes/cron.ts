import { removeAllExpired } from '@/controllers/short-link.js'
import { Router } from 'express'

const router = Router()

router.get('/cron/short-links', removeAllExpired)

export default router
