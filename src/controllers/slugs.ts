import prisma from '@/db/client'
import { type Slug } from '@/schemas/Slug'
import { conflict, notFound, unauthorized } from '@hapi/boom'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type NextFunction, type Request, type Response } from 'express'

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.userId

    const { page = 0 } = req.query

    const slugs = await prisma.slugs.findMany({
      where: {
        user_id: userId
      },
      skip: Number(page) * 6,
      take: 6,
      select: {
        id: true,
        url: true,
        slug: true,
        description: true,
        created_at: true
      }
    })

    const count = await prisma.slugs.count({
      where: {
        user_id: userId
      }
    })

    const response = {
      data: slugs,
      info: {
        pages: Math.ceil(count / 6)
      }
    }

    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { id } = req.params
  try {
    const userId = req.userId

    const slug = await prisma.slugs.findUnique({
      where: { id, AND: { user_id: userId } },
      select: {
        id: true,
        url: true,
        slug: true,
        description: true,
        created_at: true
      }
    })

    if (slug === null) throw notFound('Not found')

    return res.status(200).json({ data: slug })
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
    const userId = req.userId

    const { slug, url } = req.body as Slug

    let { description } = req.body as Slug

    description ||= 'No description'

    const newSlug = await prisma.slugs.create({
      data: {
        slug,
        url,
        description,
        user_id: userId
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
      } else if (error.code === 'P2003' || error.code === 'P2023') {
        next(unauthorized('Unauthorized'))
      }
    }
    next(error)
  }
}

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.userId

    const { id } = req.params

    const { url } = req.body as Slug

    let { description } = req.body as Slug

    description ||= 'No description'

    const slug = await prisma.slugs.update({
      data: {
        description,
        url
      },
      where: { id, AND: { user_id: userId } },
      select: {
        id: true
      }
    })

    return res.status(200).json({ data: slug })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
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
): Promise<Response | void> => {
  try {
    const userId = req.userId

    const { id } = req.params

    await prisma.slugs.delete({
      where: { id, AND: { user_id: userId } }
    })

    return res.status(204).json({ message: 'Slug deleted' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003' || error.code === 'P2023') {
        next(unauthorized('Unauthorized'))
      } else if (error.code === 'P2025') {
        next(notFound('Not found'))
      }
    }
    next(error)
  }
}
