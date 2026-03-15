import { queryOptions, useQuery } from '@tanstack/react-query'

import { teamQueryKeys } from './queryKeys'
import { getTeams } from '../api/team.api'

const teamsStaleTimeMs = 5 * 60 * 1000

export const teamsQueryOptions = () =>
  queryOptions({
    queryKey: teamQueryKeys.list(),
    queryFn: getTeams,
    staleTime: teamsStaleTimeMs,
  })

export const useTeams = () => useQuery(teamsQueryOptions())
