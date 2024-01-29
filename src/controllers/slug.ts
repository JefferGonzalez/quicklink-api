import prisma from '@/db/client'
import { notFound } from '@hapi/boom'
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

    if (data === null) throw notFound('Not found')

    return res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
}
