import * as Sentry from '@sentry/react'
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

    const schemaError = new Error('Invalid API response')

    Sentry.captureException(schemaError, {
      tags: {
        errorType: 'schema-validation',
        handled: 'true',
      },
      extra: {
        issues,
      },
    })

    throw schemaError
  }

  return result.data
}
