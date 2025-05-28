import env from '@/env.js'
import type { CookieOptions } from 'express'

export const COOKIE_SETTINGS: CookieOptions = {
  domain: env.COOKIE_DOMAIN,
  httpOnly: env.COOKIE_HTTP_ONLY,
  path: '/',
  sameSite: env.COOKIE_SAME_SITE,
  secure: env.COOKIE_SECURE
}
