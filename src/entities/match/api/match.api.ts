import { baseQuery } from '@/shared/api/baseQuery'
import { API_ENDPOINTS } from '@/shared/api/endpoints'
import { parseSchema } from '@/shared/lib/zod/safeParse'

import { MatchesResponseSchema, type MatchesResponse } from './match.schema'

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

  return parseSchema(MatchesResponseSchema, data)
}
