import prisma from '@/db/client'
import { type GitHubProfile } from '@/types'
import { generateToken } from '@/utils/jwt'
import { type Request, type Response } from 'express'
import { type Profile } from 'passport-google-oauth20'

export interface User {
  profile?: GitHubProfile | Profile
}

export const findOrCreate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const data: User | undefined = req?.user

    if (data?.profile === undefined) {
      return res.status(401).json({ errors: ['Unauthorized'] })
    }

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

    return res.status(200).json({ data: token })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
