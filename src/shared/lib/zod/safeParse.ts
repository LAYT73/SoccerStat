import { z } from 'zod'

export function parseSchema<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)

  if (!result.success) {
    console.error(z.treeifyError(result.error))
    throw new Error('Invalid API response')
  }

  return result.data
}
