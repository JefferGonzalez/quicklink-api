import config from '@/config'
import { cookieExtractor } from '@/middlewares/cookie'
import { type Strategy } from 'passport'
import { ExtractJwt, Strategy as JSONWebTokenStrategy } from 'passport-jwt'

export const JSONWebToken: Strategy = new JSONWebTokenStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.JSON_WEB_TOKEN_SECRET
  },
  (payload, done) => {
    done(null, payload)
  }
)
