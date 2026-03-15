import { z } from 'zod'

const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string().optional(),
  tla: z.string().optional(),
  crest: z.string().nullable().optional(),
})

const ScoreTimeSchema = z.object({
  home: z.number().nullable(),
  away: z.number().nullable(),
})

const ScoreTimeWithDefaultSchema = ScoreTimeSchema.optional().default({
  home: null,
  away: null,
})

const ScoreSchema = z.object({
  winner: z.enum(['HOME_TEAM', 'AWAY_TEAM', 'DRAW']).nullable(),
  duration: z.string(),
  fullTime: ScoreTimeWithDefaultSchema,
  halfTime: ScoreTimeWithDefaultSchema,
  extraTime: ScoreTimeWithDefaultSchema,
  penalties: ScoreTimeWithDefaultSchema,
})

export const MatchSchema = z.object({
  id: z.number(),
  utcDate: z.string(),
  status: z.string(),
  matchday: z.number().nullable(),
  stage: z.string(),
  group: z.string().nullable(),
  homeTeam: TeamSchema,
  awayTeam: TeamSchema,
  score: ScoreSchema,
  competition: z.object({
    id: z.number(),
    name: z.string(),
  }),
})

export const MatchesResponseSchema = z.object({
  matches: z.array(MatchSchema),
})

export type Match = z.infer<typeof MatchSchema>
export type MatchesResponse = z.infer<typeof MatchesResponseSchema>
