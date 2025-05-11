import config from '@/config'
import { badImplementation, unauthorized } from '@hapi/boom'
import jwt, { type JwtPayload } from 'jsonwebtoken'

export const generateToken = (userId: string): string => {
  try {
    const payload: JwtPayload = {
      sub: userId
    }

    const token = jwt.sign(payload, config.JSON_WEB_TOKEN_SECRET, {
      expiresIn: Number(config.SESSION_AGE)
    })

    return token
  } catch (error) {
    throw badImplementation('Internal server error')
  }
}

export const verifyToken = (token: string): JwtPayload => {
  try {
    const payload = jwt.verify(token, config.JSON_WEB_TOKEN_SECRET)

    return payload as JwtPayload
  } catch (error) {
    throw unauthorized('Unauthorized')
  }
}
