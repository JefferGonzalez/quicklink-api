import { GitHub } from '@/auth/strategies/GitHub'
import { Google } from '@/auth/strategies/Google'
import passport from 'passport'

export const initAuth = (): void => {
  passport.use('github', GitHub)
  passport.use('google', Google)
}
