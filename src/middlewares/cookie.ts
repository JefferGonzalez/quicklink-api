import { verifyToken } from '@/utils/jwt'
import { unauthorized } from '@hapi/boom'
import { type NextFunction, type Request, type Response } from 'express'

export const cookieExtractor = (req: Request): string | null => {
  let token: string | null = null

  token ??= req.cookies.token

  return token
}

export const tokenExtractor = () => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      const token = req.cookies.token as string

      const { sub } = verifyToken(token)

      if (!sub) throw unauthorized('Unauthorized')

      req.userId = sub

      next()
    } catch (error) {
      next(error)
    }
  }
}
