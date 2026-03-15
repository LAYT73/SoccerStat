import { describe, expect, it } from 'vitest'

import { TeamSchema, TeamsResponseSchema } from '../team.schema'

describe('team schemas', () => {
  it('parses team detail response', () => {
    const result = TeamSchema.safeParse({
      id: 57,
      name: 'Arsenal FC',
      crest: 'https://crests.football-data.org/57.png',
    })

    expect(result.success).toBe(true)
  })

  it('parses teams list response', () => {
    const result = TeamsResponseSchema.safeParse({
      count: 1,
      teams: [
        {
          id: 57,
          name: 'Arsenal FC',
          crest: 'https://crests.football-data.org/57.png',
        },
      ],
    })

    expect(result.success).toBe(true)
  })
})
