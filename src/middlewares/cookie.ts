import { type Request } from 'express'

export const cookieExtractor = (req: Request): string | null => {
  let token: string | null = null

  token ??= req.cookies.token

  return token
}
