import { baseQuery } from '@/shared/api/baseQuery'
import { parseSchema } from '@/shared/lib/zod/safeParse'

import { MatchesResponseSchema, type MatchesResponse } from './match.schema'

interface Params {
  competitionId?: number
  teamId?: number
  dateFrom?: string
  dateTo?: string
}

export const getMatches = async (params: Params): Promise<MatchesResponse> => {
  const { competitionId, teamId, dateFrom, dateTo } = params

  const url = competitionId
    ? `/competitions/${competitionId}/matches`
    : `/teams/${teamId}/matches`

  const data = await baseQuery({
    url,
    method: 'GET',
    params: dateFrom && dateTo ? { dateFrom, dateTo } : undefined,
  })

  return parseSchema(MatchesResponseSchema, data)
}
