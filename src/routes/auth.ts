import config from '@/config'
import { findOrCreate } from '@/controllers/users'
import { COOKIE_SETTINGS } from '@/utils/cookie'
import { Router, type Request, type Response } from 'express'
import passport from 'passport'

const router = Router()

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false
  })
)

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: config.FAILURE_REDIRECT_URL,
    session: false
  }),
  findOrCreate
)

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
  })
)

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: config.FAILURE_REDIRECT_URL,
    session: false
  }),
  findOrCreate
)

router.get('/logout', (_: Request, res: Response) => {
  res.clearCookie('token', COOKIE_SETTINGS).sendStatus(200)
})

export default router
