import { z } from 'zod'

export const TeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  crest: z.string().nullable(),
})

export const TeamsResponseSchema = z.object({
  count: z.number(),
  teams: z.array(TeamSchema),
})

export type Team = z.infer<typeof TeamSchema>
export type TeamsResponse = z.infer<typeof TeamsResponseSchema>
