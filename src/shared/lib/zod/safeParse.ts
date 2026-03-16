import { z } from 'zod'

export function parseSchema<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)

  if (!result.success) {
    const issues = result.error.issues.map((issue) => ({
      path: issue.path.join('.') || '(root)',
      message: issue.message,
      code: issue.code,
      expected: 'expected' in issue ? issue.expected : undefined,
      received: 'received' in issue ? issue.received : undefined,
    }))

    console.error('Zod validation failed for API response', {
      issues,
      tree: z.treeifyError(result.error),
      data,
    })
    throw new Error('Invalid API response')
  }

  return result.data
}
