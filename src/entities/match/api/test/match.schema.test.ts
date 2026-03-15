import { describe, expect, it } from 'vitest'

import { MatchesResponseSchema } from '../match.schema'

describe('MatchesResponseSchema', () => {
  it('fills missing optional score parts from API response', () => {
    const result = MatchesResponseSchema.parse({
      matches: [
        {
          id: 554740,
          utcDate: '2026-01-28T22:00:00Z',
          status: 'FINISHED',
          matchday: 1,
          stage: 'REGULAR_SEASON',
          group: null,
          homeTeam: {
            id: 1766,
            name: 'CA Mineiro',
            shortName: 'Mineiro',
            tla: 'CAM',
            crest: 'https://crests.football-data.org/1766.png',
          },
          awayTeam: {
            id: 1769,
            name: 'SE Palmeiras',
            shortName: 'Palmeiras',
            tla: 'PAL',
            crest: 'https://crests.football-data.org/1769.png',
          },
          competition: {
            id: 2013,
            name: 'Campeonato Brasileiro Serie A',
          },
          score: {
            winner: 'DRAW',
            duration: 'REGULAR',
            fullTime: {
              home: 2,
              away: 2,
            },
            halfTime: {
              home: 1,
              away: 1,
            },
          },
        },
      ],
    })

    expect(result.matches[0].score.extraTime).toEqual({ home: null, away: null })
    expect(result.matches[0].score.penalties).toEqual({ home: null, away: null })
  })
})
