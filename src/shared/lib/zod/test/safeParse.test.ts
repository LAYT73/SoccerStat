import * as Sentry from '@sentry/react'
import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import { parseSchema } from '../safeParse'

vi.mock('@sentry/react', () => ({
  captureException: vi.fn(),
}))

describe('parseSchema', () => {
  it('returns parsed value for valid data', () => {
    const schema = z.object({ id: z.number() })

    expect(parseSchema(schema, { id: 1 })).toEqual({ id: 1 })
  })

  it('throws Invalid API response for invalid data', () => {
    const schema = z.object({ id: z.number() })
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => parseSchema(schema, { id: '1' })).toThrow('Invalid API response')
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Zod validation failed for API response',
      expect.objectContaining({
        data: { id: '1' },
        issues: expect.arrayContaining([
          expect.objectContaining({
            path: 'id',
          }),
        ]),
      }),
    )
    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Invalid API response' }),
      expect.objectContaining({
        tags: expect.objectContaining({
          errorType: 'schema-validation',
          handled: 'true',
        }),
        extra: expect.objectContaining({
          issues: expect.arrayContaining([
            expect.objectContaining({
              path: 'id',
            }),
          ]),
        }),
      }),
    )

    consoleErrorSpy.mockRestore()
  })
})
