import { type PayloadError } from '@/types.js'
import { Boom } from '@hapi/boom'
import { type NextFunction, type Request, type Response } from 'express'
import { ZodError } from 'zod'

export const errorHandler = (
  error: Error | ZodError | Boom,
  _: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof ZodError) {
    const { issues } = error

    const payload: PayloadError = {
      errors: issues.map(({ message, path }) => ({
        message,
        path
      }))
    }

    return res.status(400).json(payload)
  }

  if (error instanceof Boom) {
    const {
      output: {
        statusCode,
        payload: { message }
      }
    } = error

    const payload: PayloadError = {
      errors: [
        {
          message
        }
      ]
    }

    res.status(statusCode).json(payload)
  }

  next()
}
