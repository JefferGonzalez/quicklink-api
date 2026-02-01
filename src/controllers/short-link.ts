import prisma from '@/db/client.js'
import { Prisma } from '@/db/prisma/client.js'
import env from '@/env.js'
import { type ShortLink } from '@/schemas/ShortLink.js'
import { conflict, notFound, unauthorized } from '@hapi/boom'
import { type NextFunction, type Request, type Response } from 'express'

const USER = 'USER'
const ANONYMOUS = 'ANONYMOUS'

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = req.session

    const { slug, url, description = 'No description' } = req.body as ShortLink

    const expiredAt = session ? null : new Date(Date.now() + 3600000)

    const newShortLink = await prisma.shortLink.create({
      data: {
        slug,
        url,
        description,
        expired_at: expiredAt,
        user_id: session?.userId ?? null,
        type: session ? USER : ANONYMOUS
      },
      select: {
        id: true
      }
    })

    res.status(201).json({ data: newShortLink })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(conflict('Slug already exists'))
      } else if (error.code === 'P2003' || error.code === 'P2023') {
        next(unauthorized('Unauthorized'))
      }
    }
    next(error)
  }
}

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session) throw unauthorized('Unauthorized')

    const session = req.session

    const page = Number(req.query.page ?? 1) - 1
    const skip = page * 6

    const shortLinks = await prisma.shortLink.findMany({
      where: {
        user_id: session.userId
      },
      skip,
      take: 6,
      select: {
        id: true,
        url: true,
        slug: true,
        description: true,
        created_at: true
      }
    })

    const count = await prisma.shortLink.count({
      where: {
        user_id: session.userId
      }
    })

    const response = {
      data: shortLinks,
      info: {
        pages: Math.ceil(count / 6)
      }
    }

    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session) throw unauthorized('Unauthorized')

    const session = req.session
    const { id } = req.params as { id: string }

    const shortLink = await prisma.shortLink.findUnique({
      where: {
        id,
        user_id: session.userId
      },
      select: {
        id: true,
        url: true,
        slug: true,
        description: true,
        created_at: true
      }
    })

    if (shortLink === null) throw notFound('Not found')

    res.status(200).json({ data: shortLink })
  } catch (error) {
    next(error)
  }
}

export const findBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { slug } = req.params as { slug: string }

    const shortLink = await prisma.shortLink.findUnique({
      where: { slug },
      select: {
        url: true,
        type: true,
        expired_at: true
      }
    })

    if (!shortLink) throw notFound('Not found')

    if (shortLink.type === 'ANONYMOUS') {
      const now = new Date()

      if (!shortLink.expired_at || now > shortLink.expired_at) {
        await prisma.shortLink.delete({ where: { slug } })

        throw notFound('Not found')
      }
    }

    res.status(200).json({ data: { url: shortLink.url } })
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
    if (!req.session) throw unauthorized('Unauthorized')

    const session = req.session
    const { id } = req.params as { id: string }
    const { url, description = 'No description' } = req.body as ShortLink

    const shortLink = await prisma.shortLink.update({
      data: {
        description,
        url
      },
      where: { id, AND: { user_id: session.userId } },
      select: {
        id: true
      }
    })

    res.status(200).json({ data: shortLink })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003' || error.code === 'P2023') {
        next(unauthorized('Unauthorized'))
      } else if (error.code === 'P2025') {
        next(notFound('Not found'))
      }
    }
    next(error)
  }
}

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session) throw unauthorized('Unauthorized')

    const session = req.session
    const { id } = req.params as { id: string }

    await prisma.shortLink.delete({
      where: { id, AND: { user_id: session.userId } }
    })

    res.status(204).json({ message: 'Short Link deleted' })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003' || error.code === 'P2023') {
        next(unauthorized('Unauthorized'))
      } else if (error.code === 'P2025') {
        next(notFound('Not found'))
      }
    }
    next(error)
  }
}

export const removeAllExpired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = `Bearer ${env.CRON_SECRET}`

    if (req.headers.authorization !== token) {
      res.sendStatus(401)
    }

    const now = new Date()

    await prisma.shortLink.deleteMany({
      where: {
        expired_at: {
          lt: now
        }
      }
    })

    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}
