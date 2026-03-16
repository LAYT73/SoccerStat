import { beforeEach, describe, expect, it, vi } from 'vitest'

import { API_ENDPOINTS } from '@/shared/api/endpoints'

const { baseQueryMock } = vi.hoisted(() => ({
  baseQueryMock: vi.fn(),
}))

vi.mock('@/shared/api/baseQuery', () => ({
  baseQuery: baseQueryMock,
}))

import { getMatches } from '../match.api'

describe('getMatches', () => {
  beforeEach(() => {
    baseQueryMock.mockReset()
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

  it('keeps valid matches and drops invalid ones', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    baseQueryMock.mockResolvedValueOnce({
      competition: { id: 2000, name: 'World Cup' },
      matches: [
        {
          id: 1,
          utcDate: '2026-03-10T12:00:00Z',
          status: 'SCHEDULED',
          matchday: 1,
          stage: 'GROUP_STAGE',
          group: null,
          homeTeam: { id: 10, name: 'A', shortName: 'A', tla: 'AAA', crest: null },
          awayTeam: { id: 11, name: 'B', shortName: 'B', tla: 'BBB', crest: null },
          score: {
            winner: null,
            duration: 'REGULAR',
            fullTime: { home: null, away: null },
            halfTime: { home: null, away: null },
          },
          competition: { id: 2000, name: 'World Cup' },
        },
        {
          id: 2,
          utcDate: '2026-03-10T14:00:00Z',
          status: 'SCHEDULED',
          matchday: 1,
          stage: 'GROUP_STAGE',
          group: null,
          homeTeam: { id: 12, name: 'C', shortName: 'C', tla: 'CCC', crest: null },
          awayTeam: { id: null, name: null, shortName: null, tla: null, crest: null },
          score: {
            winner: null,
            duration: 'REGULAR',
            fullTime: { home: null, away: null },
            halfTime: { home: null, away: null },
          },
          competition: { id: 2000, name: 'World Cup' },
        },
      ],
    })

    const response = await getMatches({ competitionId: 2000 })

    expect(response.competition?.name).toBe('World Cup')
    expect(response.matches).toHaveLength(1)
    expect(response.matches[0].id).toBe(1)
    expect(warnSpy).toHaveBeenCalledWith(
      'Dropped invalid matches from API response',
      expect.objectContaining({ droppedCount: 1 }),
    )

    warnSpy.mockRestore()
  })
})
