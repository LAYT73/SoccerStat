import { beforeEach, describe, expect, it, vi } from 'vitest'

import { API_ENDPOINTS } from '@/shared/api/endpoints'

const { baseQueryMock, parseSchemaMock } = vi.hoisted(() => ({
  baseQueryMock: vi.fn(),
  parseSchemaMock: vi.fn((_schema: unknown, data: unknown) => data),
}))

vi.mock('@/shared/api/baseQuery', () => ({
  baseQuery: baseQueryMock,
}))

vi.mock('@/shared/lib/zod/safeParse', () => ({
  parseSchema: parseSchemaMock,
}))

import { getCompetitions } from '../competition.api'

describe('competition api', () => {
  beforeEach(() => {
    baseQueryMock.mockReset()
    parseSchemaMock.mockClear()
  })

  it('calls baseQuery with competitions endpoint', async () => {
    baseQueryMock.mockResolvedValueOnce({ count: 0, competitions: [] })

    await getCompetitions()

    expect(baseQueryMock).toHaveBeenCalledWith({
      method: 'GET',
      url: API_ENDPOINTS.competitions,
    })
    expect(parseSchemaMock).toHaveBeenCalled()
  })
})
