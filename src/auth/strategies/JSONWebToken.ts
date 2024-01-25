import config from '@/config'
import { type Strategy } from 'passport'
import { ExtractJwt, Strategy as JSONWebTokenStrategy } from 'passport-jwt'

export const JSONWebToken: Strategy = new JSONWebTokenStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JSON_WEB_TOKEN_SECRET
  },
  (payload, done) => {
    done(null, payload)
  }
)
