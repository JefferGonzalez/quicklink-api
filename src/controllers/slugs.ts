import prisma from '@/db/client'
import { type Slug } from '@/schemas/Slug'
import { verifyToken } from '@/utils/jwt'
import { conflict, notFound, unauthorized } from '@hapi/boom'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type NextFunction, type Request, type Response } from 'express'

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const token = req.cookies.token ?? ''

    const { sub } = verifyToken(token)

    const slugs = await prisma.slugs.findMany({
      where: {
        user_id: sub
      }
    })

    return res.status(200).json({ data: slugs })
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
    const token = req.cookies.token ?? ''

    const { sub } = verifyToken(token)

    const slug = await prisma.slugs.findUnique({
      where: { id, AND: { user_id: sub } }
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
    const token = req.cookies.token ?? ''

    const { sub = '' } = verifyToken(token)

    const { slug, url }: Slug = req.body

    let { description }: Slug = req.body

    description ||= 'No description'

    const newSlug = await prisma.slugs.create({
      data: {
        slug,
        url,
        description,
        user_id: sub
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
    const token = req.cookies.token ?? ''

    const { sub = '' } = verifyToken(token)

    const { id } = req.params

    const { url }: Slug = req.body

    let { description }: Slug = req.body

    description ||= 'No description'

    const slug = await prisma.slugs.update({
      data: {
        description,
        url
      },
      where: { id, AND: { user_id: sub } }
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
    const token = req.cookies.token ?? ''

    const { sub = '' } = verifyToken(token)

    const { id } = req.params

    await prisma.slugs.delete({
      where: { id, AND: { user_id: sub } }
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
