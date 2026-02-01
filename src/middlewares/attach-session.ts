import { auth } from '@/lib/auth.js'
import { fromNodeHeaders } from 'better-auth/node'
import { type NextFunction, type Request, type Response } from 'express'

export const attachSession = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    })

    req.user = session?.user ?? null
    req.session = session?.session ?? null

    next()
  } catch (error) {
    next(error)
  }
}
