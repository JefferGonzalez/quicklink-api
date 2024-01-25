import config from '@/config'
import jwt, { type JwtPayload } from 'jsonwebtoken'

export const generateToken = (userId: string): string => {
  try {
    const payload: JwtPayload = {
      sub: userId
    }

    const token = jwt.sign(payload, config.JSON_WEB_TOKEN_SECRET, {
      expiresIn: config.JSON_WEB_TOKEN_EXPIRES_IN
    })

    return token
  } catch (error) {
    throw new Error('Error generating token')
  }
}

export const verifyToken = (token: string): JwtPayload => {
  try {
    const payload = jwt.verify(token, config.JSON_WEB_TOKEN_SECRET)

    return payload as JwtPayload
  } catch (error) {
    throw new Error('Error verifying token')
  }
}
