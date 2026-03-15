import { queryOptions, useQuery } from '@tanstack/react-query'

import { competitionQueryKeys } from './queryKeys'
import { getCompetitionById, getCompetitions } from '../api/competition.api'

const competitionsStaleTimeMs = 5 * 60 * 1000

export const competitionsQueryOptions = () =>
  queryOptions({
    queryKey: competitionQueryKeys.list(),
    queryFn: getCompetitions,
    staleTime: competitionsStaleTimeMs,
  })

export const useCompetitions = () => useQuery(competitionsQueryOptions())

export const competitionDetailQueryOptions = (competitionId: number) =>
  queryOptions({
    queryKey: competitionQueryKeys.detail(competitionId),
    queryFn: () => getCompetitionById(competitionId),
    staleTime: competitionsStaleTimeMs,
  })

export const useCompetition = (competitionId?: number) =>
  useQuery({
    ...competitionDetailQueryOptions(competitionId ?? 0),
    enabled: competitionId !== undefined,
  })
