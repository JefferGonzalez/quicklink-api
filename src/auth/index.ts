import { GitHub } from '@/auth/strategies/GitHub.js'
import { Google } from '@/auth/strategies/Google.js'
import { JSONWebToken } from '@/auth/strategies/JSONWebToken.js'
import passport from 'passport'

export const initAuth = (): void => {
  passport.use('github', GitHub)
  passport.use('google', Google)
  passport.use('jwt', JSONWebToken)
}
