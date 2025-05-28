import env from '@/env.js'
import { type Strategy } from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

export const Google: Strategy = new GoogleStrategy(
  {
    clientID: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
    callbackURL: env.GOOGLE_CALLBACK_URL
  },
  (_, __, profile, done) => {
    done(null, { profile })
  }
)
