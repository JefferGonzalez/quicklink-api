import config from '@/config'
import { findOrCreate } from '@/controllers/users'
import { Router } from 'express'
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

export default router
