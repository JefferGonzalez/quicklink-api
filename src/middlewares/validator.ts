import { type NextFunction, type Request, type Response } from 'express'
import { type ZodType } from 'zod'

export const validateSchema = (
  schema: ZodType,
  property: 'params' | 'query' | 'body'
) => {
  return (req: Request, _: Response, next: NextFunction) => {
    try {
      schema.parse(req[property])

      next()
    } catch (error) {
      next(error)
    }
  }
}
