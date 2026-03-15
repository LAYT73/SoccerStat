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

import { getTeamById, getTeams } from '../team.api'

describe('team api', () => {
  beforeEach(() => {
    baseQueryMock.mockReset()
    parseSchemaMock.mockClear()
  })

  it('calls baseQuery with teams endpoint', async () => {
    baseQueryMock.mockResolvedValueOnce({ count: 0, teams: [] })

    await getTeams()

    expect(baseQueryMock).toHaveBeenCalledWith({
      method: 'GET',
      url: API_ENDPOINTS.teams,
    })
    expect(parseSchemaMock).toHaveBeenCalled()
  })

  it('calls baseQuery with team detail endpoint', async () => {
    baseQueryMock.mockResolvedValueOnce({ id: 57 })

    await getTeamById(57)

    expect(baseQueryMock).toHaveBeenCalledWith({
      method: 'GET',
      url: API_ENDPOINTS.teamById(57),
    })
    expect(parseSchemaMock).toHaveBeenCalled()
  })
})
