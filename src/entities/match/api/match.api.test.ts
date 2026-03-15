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

import { getMatches } from './match.api'

describe('getMatches', () => {
  beforeEach(() => {
    baseQueryMock.mockReset()
    parseSchemaMock.mockClear()
  })

  it('throws when both competitionId and teamId are provided', async () => {
    await expect(getMatches({ competitionId: 1, teamId: 2 })).rejects.toThrow(
      'Either competitionId or teamId must be provided (but not both).',
    )
  })

  it('throws when no ids are provided', async () => {
    await expect(getMatches({})).rejects.toThrow(
      'Either competitionId or teamId must be provided (but not both).',
    )
  })

  it('calls baseQuery with competition endpoint and date params', async () => {
    baseQueryMock.mockResolvedValueOnce({ matches: [] })

    await getMatches({
      competitionId: 7,
      dateFrom: '2026-03-01',
      dateTo: '2026-03-15',
    })

    expect(baseQueryMock).toHaveBeenCalledWith({
      method: 'GET',
      params: { dateFrom: '2026-03-01', dateTo: '2026-03-15' },
      url: API_ENDPOINTS.competitionMatches(7),
    })
    expect(parseSchemaMock).toHaveBeenCalled()
  })

  it('calls baseQuery with team endpoint without date params by default', async () => {
    baseQueryMock.mockResolvedValueOnce({ matches: [] })

    await getMatches({ teamId: 42 })

    expect(baseQueryMock).toHaveBeenCalledWith({
      method: 'GET',
      params: undefined,
      url: API_ENDPOINTS.teamMatches(42),
    })
  })
})
