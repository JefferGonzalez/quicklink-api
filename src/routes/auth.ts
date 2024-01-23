import config from '@/config'
import { type Request, type Response, Router } from 'express'
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
  (req: Request, res: Response) => {
    res.status(200).json(req.user)
  }
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
  (req: Request, res: Response) => {
    res.status(200).json(req.user)
  }
)

export default router
