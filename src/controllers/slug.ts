import prisma from '@/db/client'
import { type Slug } from '@/schemas/Slug'
import { conflict, notFound } from '@hapi/boom'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type NextFunction, type Request, type Response } from 'express'

export const getSlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { slug } = req.params
  try {
    const data = await prisma.slugs.findUnique({
      where: { slug },
      select: {
        url: true
      }
    })

    const free = await prisma.slug.findUnique({
      where: { slug },
      select: {
        url: true,
        expired_at: true
      }
    })

    if (data === null && free === null) {
      throw notFound('Not found')
    }

    if (data !== null) {
      return res.status(200).json({ data })
    }

    if (free !== null) {
      const expiredAt = free.expired_at
      const date = new Date(Date.now())

      if (date > expiredAt) {
        await prisma.slug.delete({
          where: { slug }
        })

        throw notFound('Not found')
      }
    }

    return res.status(200).json({ data: free })
  } catch (error) {
    next(error)
  }
}

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { slug, url } = req.body as Slug

    const data = await prisma.slugs.findUnique({
      where: { slug }
    })

    if (data !== null) {
      throw conflict('Slug already exists')
    }

    const date = new Date(Date.now() + 3600000)

    const newSlug = await prisma.slug.create({
      data: {
        slug,
        url,
        expired_at: date
      },
      select: {
        id: true
      }
    })

    return res.status(201).json({ data: newSlug })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        next(conflict('Slug already exists'))
      }
    }
    next(error)
  }
}

export const removeAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = `Bearer ${process.env.CRON_SECRET ?? ''}`
    
    if (req.headers.Authorization !== token) {
      return res.sendStatus(401)
    }

    const date = new Date(Date.now())

    await prisma.slug.deleteMany({
      where: {
        expired_at: {
          lt: date
        }
      }
    })

    return res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}
