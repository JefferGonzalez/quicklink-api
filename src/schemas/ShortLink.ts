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

export const ShortLinkId = z.object({
  id: z.uuid({
    message: 'ShortLink ID must be a valid UUID'
  })
})

export const ShortLinkSchema = z.object({
  url: z.url({
    message: 'URL must be a valid URL'
  }),
  slug: z.string().min(1, {
    message: 'Slug must be at least 1 character long'
  }),
  description: z.string().optional()
})

export const ShortLinkSchemaWithoutSlug = ShortLinkSchema.omit({ slug: true })

export type ShortLink = z.infer<typeof ShortLinkSchema>
export type ShortLinkWithoutSlug = z.infer<typeof ShortLinkSchemaWithoutSlug>
