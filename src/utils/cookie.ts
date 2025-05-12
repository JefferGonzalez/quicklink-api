import config from '@/config.js'
import type { CookieOptions } from 'express'

export const COOKIE_SETTINGS: CookieOptions = {
  domain: config.COOKIE_SETTINGS.domain,
  httpOnly: config.COOKIE_SETTINGS.httpOnly,
  path: '/',
  sameSite: config.COOKIE_SETTINGS.sameSite === 'none' ? 'none' : 'strict',
  secure: config.COOKIE_SETTINGS.secure
}
