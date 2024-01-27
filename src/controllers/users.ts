import config from '@/config'
import prisma from '@/db/client'
import { type GitHubProfile } from '@/types'
import { generateToken, verifyToken } from '@/utils/jwt'
import { notFound, unauthorized } from '@hapi/boom'
import { type NextFunction, type Request, type Response } from 'express'
import { type Profile } from 'passport-google-oauth20'

export interface User {
  profile?: GitHubProfile | Profile
}

export const findOrCreate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const data: User | undefined = req?.user

    if (data?.profile === undefined) throw unauthorized('Unauthorized')

    const { profile } = data

    const { provider, id, displayName, username, photos, _json } = profile
    const { email } = _json

    const account = await prisma.accounts.findUnique({
      where: { provider_id: id },
      include: { user: true }
    })

    let userId: string

    if (account === null) {
      const user = await prisma.users.create({
        data: {
          name: displayName,
          username: username ?? displayName,
          email,
          photo: photos?.at(0)?.value
        }
      })

      userId = user.id

      await prisma.accounts.create({
        data: {
          provider,
          provider_id: id,
          user_id: userId
        }
      })
    } else {
      userId = account.user_id
    }

    const token = generateToken(userId)
    const date = new Date(Date.now() + Number(config.JSON_WEB_TOKEN_EXPIRES_IN))

    res
      .cookie('token', token, {
        httpOnly: true,
        expires: date,
        sameSite: 'none',
        path: '/',
        secure: true
      })
      .redirect(config.CLIENT_URL)
  } catch (error) {
    next(error)
  }
}

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = req.cookies.token ?? ''

    const { sub } = verifyToken(token)

    const user = await prisma.users.findUnique({
      where: { id: sub },
      select: {
        name: true,
        username: true,
        photo: true
      }
    })

    if (user === null) throw notFound('Not found')

    return res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}
