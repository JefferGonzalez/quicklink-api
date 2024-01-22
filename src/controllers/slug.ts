import prisma from '@/db/client'
import { type Slug } from '@/schemas/Slug'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { type Request, type Response } from 'express'

export const findAll = async (_: Request, res: Response): Promise<Response> => {
  try {
    const slugs = await prisma.slug.findMany()

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
    const slug = await prisma.slug.findUnique({
      where: { id }
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
    const { slug, url, description }: Slug = req.body

    const newSlug = await prisma.slug.create({
      data: {
        slug,
        url,
        description
      }
    })

    return res.status(200).json({ data: newSlug })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return res.status(409).json({ errors: ['Slug already exists'] })
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
    const { id } = req.params

    const { url, description }: Slug = req.body

    const slug = await prisma.slug.update({
      data: {
        description,
        url
      },
      where: { id }
    })

    return res.status(200).json({ data: slug })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export const remove = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params

    await prisma.slug.delete({
      where: { id }
    })

    return res.status(204).json({ message: 'Slug deleted' })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
