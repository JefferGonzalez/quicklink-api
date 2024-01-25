import { GitHub } from '@/auth/strategies/GitHub'
import { Google } from '@/auth/strategies/Google'
import { JSONWebToken } from '@/auth/strategies/JSONWebToken'
import passport from 'passport'

export const initAuth = (): void => {
  passport.use('github', GitHub)
  passport.use('google', Google)
  passport.use('jwt', JSONWebToken)
}
