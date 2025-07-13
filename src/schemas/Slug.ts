import * as z from 'zod'

export const QuerySchema = z.object({
  page: z
    .string()
    .transform(Number)
    .pipe(
      z.number().int().gte(1, {
        message: 'Page must be an integer >= 1'
      })
    )
    .optional()
})

export const SlugId = z.object({
  id: z
    .string({
      required_error: 'Slug ID is required'
    })
    .uuid({
      message: 'Slug ID must be a valid UUID'
    })
})

export const SlugSchema = z.object({
  url: z
    .string({
      invalid_type_error: 'URL must be a string',
      required_error: 'URL is required'
    })
    .min(1, {
      message: 'URL must be at least 1 character long'
    })
    .url({
      message: 'URL must be a valid URL'
    }),
  slug: z
    .string({
      invalid_type_error: 'Slug must be a string',
      required_error: 'Slug is required'
    })
    .min(1, {
      message: 'Slug must be at least 1 character long'
    }),
  description: z
    .string({
      invalid_type_error: 'Description must be a string'
    })
    .optional()
})

export const SlugSchemaWithoutSlug = SlugSchema.omit({ slug: true })

export type Slug = z.infer<typeof SlugSchema>
export type SlugWithoutSlug = z.infer<typeof SlugSchemaWithoutSlug>
