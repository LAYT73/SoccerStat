import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import { parseSchema } from '../safeParse'

describe('parseSchema', () => {
  it('returns parsed value for valid data', () => {
    const schema = z.object({ id: z.number() })

    expect(parseSchema(schema, { id: 1 })).toEqual({ id: 1 })
  })

  it('throws Invalid API response for invalid data', () => {
    const schema = z.object({ id: z.number() })
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined)

    expect(() => parseSchema(schema, { id: '1' })).toThrow('Invalid API response')

    consoleErrorSpy.mockRestore()
  })
})
