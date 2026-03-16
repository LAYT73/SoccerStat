import { z } from 'zod'

export const AreaSchema = z.object({
  id: z.number(),
  name: z.string(),
  code: z.string().nullable(),
  flag: z.string().nullable(),
})

export const SeasonSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  currentMatchday: z.number().nullable(),
  winner: z.any().nullable(),
})

export const CompetitionSchema = z.object({
  id: z.number(),
  area: AreaSchema,
  name: z.string(),
  code: z.string(),
  type: z.string(),
  emblem: z.string().nullable(),
  plan: z.string().optional(),
  currentSeason: SeasonSchema.nullable(),
  numberOfAvailableSeasons: z.number().optional(),
  seasons: z.array(SeasonSchema).optional(),
  lastUpdated: z.string(),
})

export const CompetitionsResponseSchema = z.object({
  count: z.number(),
  competitions: z.array(CompetitionSchema),
})

export type Competition = z.infer<typeof CompetitionSchema>
export type CompetitionsResponse = z.infer<typeof CompetitionsResponseSchema>
