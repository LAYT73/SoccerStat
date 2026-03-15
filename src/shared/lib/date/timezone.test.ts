import { describe, expect, it } from 'vitest'

import { formatMatchDate, isDateInRange } from './timezone'

describe('timezone utils', () => {
  it('returns dash for invalid input date', () => {
    expect(formatMatchDate('invalid-date')).toBe('-')
  })

  it('formats valid utc date', () => {
    expect(formatMatchDate('2026-03-10T12:00:00Z', 'YYYY-MM-DD')).toBe('2026-03-10')
  })

  it('correctly checks date in range with day end for "to" boundary', () => {
    expect(
      isDateInRange('2026-03-10T23:59:59Z', {
        from: '2026-03-10',
        to: '2026-03-10',
      }),
    ).toBe(true)

    expect(
      isDateInRange('2026-03-11T00:00:00Z', {
        from: '2026-03-10',
        to: '2026-03-10',
      }),
    ).toBe(false)
  })
})
