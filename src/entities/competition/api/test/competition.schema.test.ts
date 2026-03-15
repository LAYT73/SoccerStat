import { describe, expect, it } from 'vitest'

import { CompetitionSchema } from '../competition.schema'

describe('CompetitionSchema', () => {
  it('parses competition detail response without list-only fields', () => {
    const result = CompetitionSchema.safeParse({
      id: 2013,
      area: {
        id: 2032,
        name: 'Brazil',
        code: 'BRA',
        flag: 'https://crests.football-data.org/764.svg',
      },
      name: 'Campeonato Brasileiro Serie A',
      code: 'BSA',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/bsa.png',
      currentSeason: {
        id: 2474,
        startDate: '2026-01-28',
        endDate: '2026-12-02',
        currentMatchday: 6,
        winner: null,
      },
      seasons: [],
      lastUpdated: '2026-03-14T20:20:50Z',
    })

    expect(result.success).toBe(true)
  })

  it('parses competitions list response', () => {
    const result = CompetitionSchema.array().safeParse([
      {
        id: 2001,
        area: {
          id: 2072,
          name: 'England',
          code: 'ENG',
          flag: 'https://crests.football-data.org/770.svg',
        },
        name: 'UEFA Champions League',
        code: 'CL',
        type: 'CUP',
        emblem: 'https://crests.football-data.org/CL.png',
        plan: 'TIER_ONE',
        currentSeason: null,
        numberOfAvailableSeasons: 31,
        lastUpdated: '2026-03-14T20:20:50Z',
      },
    ])

    expect(result.success).toBe(true)
  })
})
