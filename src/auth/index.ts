import passport from 'passport'
import { GitHub } from '@/auth/strategies/GitHub'

export const initAuth = (): void => {
  passport.use('github', GitHub)
}
