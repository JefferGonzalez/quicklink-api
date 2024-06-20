import config from '@/config'
import { type Strategy } from 'passport'
import {
  Strategy as GoogleStrategy
} from 'passport-google-oauth20'

export const Google: Strategy = new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL
  },
  (_, __, profile, done) => {
    done(null, { profile })
  }
)
