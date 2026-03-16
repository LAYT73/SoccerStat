import { queryOptions, useQuery } from '@tanstack/react-query'

import { competitionQueryKeys } from './queryKeys'
import { getCompetitions } from '../api/competition.api'

const competitionsStaleTimeMs = 5 * 60 * 1000

export const competitionsQueryOptions = () =>
  queryOptions({
    queryKey: competitionQueryKeys.list(),
    queryFn: getCompetitions,
    staleTime: competitionsStaleTimeMs,
  })

export const useCompetitions = () => useQuery(competitionsQueryOptions())
