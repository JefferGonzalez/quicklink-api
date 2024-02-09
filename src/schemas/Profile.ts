import * as z from 'zod'

export const ProfileSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
      required_error: 'Name is required'
    })
    .min(1, {
      message: 'Name must be at least 1 character long'
    })
    .max(255, {
      message: 'Name must be at most 255 characters long'
    }),
  username: z
    .string({
      invalid_type_error: 'Username must be a string',
      required_error: 'Username is required'
    })
    .min(1, {
      message: 'Username must be at least 1 character long'
    })
    .max(255, {
      message: 'Username must be at most 255 characters long'
    })
})

export type Profile = z.infer<typeof ProfileSchema>
