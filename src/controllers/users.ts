import prisma from '@/db/client.js'
import env from '@/env.js'
import { type Profile as UserProfile } from '@/schemas/Profile.js'
import { type GitHubProfile } from '@/types.js'
import { COOKIE_SETTINGS } from '@/utils/cookie.js'
import { generateToken } from '@/utils/jwt.js'
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
) => {
  try {
    const data: User | undefined = req.user

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
          photo:
            Array.isArray(photos) && photos.length > 0
              ? photos[0].value
              : undefined
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

    res
      .cookie('token', token, {
        ...COOKIE_SETTINGS,
        maxAge: env.SESSION_AGE
      })
      .redirect(env.CLIENT_URL)
  } catch (error) {
    next(error)
  }
}

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        name: true,
        username: true,
        photo: true
      }
    })

    if (user === null) throw notFound('Not found')

    res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId

    const { name, username } = req.body as UserProfile

    const user = await prisma.users.update({
      where: { id: userId },
      data: {
        name,
        username
      },
      select: {
        name: true,
        username: true,
        photo: true
      }
    })

    res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId

    await prisma.users.delete({
      where: { id: userId }
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
}
