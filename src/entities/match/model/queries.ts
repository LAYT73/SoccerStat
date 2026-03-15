import { queryOptions, useQuery } from '@tanstack/react-query'

import { mapMatchesToView } from './mappers'
import { matchQueryKeys } from './queryKeys'
import { getMatches, type GetMatchesParams } from '../api/match.api'

const matchesStaleTimeMs = 60 * 1000

export const matchesQueryOptions = (params: GetMatchesParams) =>
  queryOptions({
    queryKey: matchQueryKeys.list(params),
    queryFn: () => getMatches(params),
    select: mapMatchesToView,
    staleTime: matchesStaleTimeMs,
  })

export const useMatches = (params: GetMatchesParams) => {
  const hasCompetitionId = params.competitionId !== undefined
  const hasTeamId = params.teamId !== undefined
  const isValidTarget = Number(hasCompetitionId) + Number(hasTeamId) === 1

  return useQuery({
    ...matchesQueryOptions(params),
    enabled: isValidTarget,
  })
}
