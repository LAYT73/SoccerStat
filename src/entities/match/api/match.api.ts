import { z } from 'zod'

import { baseQuery } from '@/shared/api/baseQuery'
import { API_ENDPOINTS } from '@/shared/api/endpoints'

import { MatchSchema, type MatchesResponse } from './match.schema'

export interface GetMatchesParams {
  competitionId?: number
  teamId?: number
  dateFrom?: string
  dateTo?: string
}

const buildDateParams = ({
  dateFrom,
  dateTo,
}: Pick<GetMatchesParams, 'dateFrom' | 'dateTo'>) => {
  const queryParams: Record<string, string> = {}

  if (dateFrom) {
    queryParams.dateFrom = dateFrom
  }

  if (dateTo) {
    queryParams.dateTo = dateTo
  }

  return Object.keys(queryParams).length > 0 ? queryParams : undefined
}

const MatchesResponseBaseSchema = z.object({
  competition: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
  matches: z.array(z.unknown()),
})

const parseMatchesResponseLenient = (data: unknown): MatchesResponse => {
  const baseResult = MatchesResponseBaseSchema.safeParse(data)

  if (!baseResult.success) {
    const issues = baseResult.error.issues.map((issue) => ({
      path: issue.path.join('.') || '(root)',
      message: issue.message,
      code: issue.code,
    }))

    throw new Error(`Invalid API response: ${JSON.stringify(issues)}`)
  }

  const validMatches: MatchesResponse['matches'] = []
  const droppedMatches: Array<{ index: number; issues: string[] }> = []

  for (let index = 0; index < baseResult.data.matches.length; index += 1) {
    const rawMatch = baseResult.data.matches[index]
    const parsedMatch = MatchSchema.safeParse(rawMatch)

    if (parsedMatch.success) {
      validMatches.push(parsedMatch.data)
      continue
    }

    droppedMatches.push({
      index,
      issues: parsedMatch.error.issues.map(
        (issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`,
      ),
    })
  }

  if (droppedMatches.length > 0) {
    console.warn('Dropped invalid matches from API response', {
      droppedCount: droppedMatches.length,
      droppedMatches,
    })
  }

  return {
    competition: baseResult.data.competition,
    matches: validMatches,
  }
}

export const getMatches = async (params: GetMatchesParams): Promise<MatchesResponse> => {
  const { competitionId, teamId, dateFrom, dateTo } = params
  const hasCompetitionId = competitionId !== undefined
  const hasTeamId = teamId !== undefined

  if (Number(hasCompetitionId) + Number(hasTeamId) !== 1) {
    throw new Error('Either competitionId or teamId must be provided (but not both).')
  }

  let url: string

  if (competitionId !== undefined) {
    url = API_ENDPOINTS.competitionMatches(competitionId)
  } else if (teamId !== undefined) {
    url = API_ENDPOINTS.teamMatches(teamId)
  } else {
    throw new Error('Either competitionId or teamId must be provided.')
  }

  const data = await baseQuery({
    url,
    method: 'GET',
    params: buildDateParams({ dateFrom, dateTo }),
  })

  return parseMatchesResponseLenient(data)
}
