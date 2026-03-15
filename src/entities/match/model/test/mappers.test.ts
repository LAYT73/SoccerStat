import { describe, expect, it, vi } from 'vitest'

import { mapMatchToView, mapMatchesToView } from '../mappers'

import type { Match, MatchesResponse } from '../../api/match.schema'

vi.mock('@/shared/lib/date/timezone', () => ({
  formatMatchDate: vi.fn(() => '10.03.2026 15:00'),
}))

const baseMatch: Match = {
  id: 1,
  utcDate: '2026-03-10T12:00:00Z',
  status: 'SCHEDULED',
  matchday: 1,
  stage: 'REGULAR_SEASON',
  group: null,
  homeTeam: {
    id: 100,
    name: 'Team A',
    crest: null,
  },
  awayTeam: {
    id: 200,
    name: 'Team B',
    crest: null,
  },
  score: {
    winner: null,
    duration: 'REGULAR',
    fullTime: { home: null, away: null },
    halfTime: { home: null, away: null },
    extraTime: { home: null, away: null },
    penalties: { home: null, away: null },
  },
  competition: {
    id: 999,
    name: 'Test League',
  },
}

describe('match mappers', () => {
  it('maps single match and adds localDate', () => {
    const result = mapMatchToView(baseMatch)

    expect(result).toEqual({
      ...baseMatch,
      localDate: '10.03.2026 15:00',
    })
  })

  it('maps response matches list', () => {
    const response: MatchesResponse = {
      matches: [baseMatch, { ...baseMatch, id: 2 }],
    }

    const result = mapMatchesToView(response)

    expect(result).toHaveLength(2)
    expect(result[0].localDate).toBe('10.03.2026 15:00')
    expect(result[1].id).toBe(2)
  })
})
