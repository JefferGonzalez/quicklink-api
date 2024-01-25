import prisma from '@/db/client'
import { type Slug } from '@/schemas/Slug'
import { verifyToken } from '@/utils/jwt'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type Request, type Response } from 'express'

export const findAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const token = req.headers.authorization?.slice(7) ?? ''

    const { sub } = verifyToken(token)

    const slugs = await prisma.slugs.findMany({
      where: {
        user_id: sub
      }
    })

    return res.status(200).json({ data: slugs })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const findOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params
  try {
    const token = req.headers.authorization?.slice(7) ?? ''

    const { sub } = verifyToken(token)

    const slug = await prisma.slugs.findUnique({
      where: { id, AND: { user_id: sub } }
    })

    if (slug === null) {
      return res.status(404).json({ errors: ['Not found'] })
    }

    return res.status(200).json({ data: slug })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const token = req.headers.authorization?.slice(7) ?? ''

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

    return res.status(200).json({ data: newSlug })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({ errors: ['Slug already exists'] })
      } else if (error.code === 'P2003' || error.code === 'P2023') {
        return res.status(401).json({ errors: ['Unauthorized'] })
      }
    }
    return res.status(500).json({ error })
  }
}

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const token = req.headers.authorization?.slice(7) ?? ''

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
        return res.status(401).json({ errors: ['Unauthorized'] })
      } else if (error.code === 'P2025') {
        return res.status(404).json({ errors: ['Not found'] })
      }
    }
    return res.status(500).json({ error })
  }
}

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const token = req.headers.authorization?.slice(7) ?? ''

    const { sub = '' } = verifyToken(token)

    const { id } = req.params

    await prisma.slugs.delete({
      where: { id, AND: { user_id: sub } }
    })

    return res.status(204).json({ message: 'Slug deleted' })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003' || error.code === 'P2023') {
        return res.status(401).json({ errors: ['Unauthorized'] })
      } else if (error.code === 'P2025') {
        return res.status(404).json({ errors: ['Not found'] })
      }
    }
    return res.status(500).json({ error })
  }
}
