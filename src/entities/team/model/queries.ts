import { queryOptions, useQuery } from '@tanstack/react-query'

import { teamQueryKeys } from './queryKeys'
import { getTeamById, getTeams } from '../api/team.api'

const teamsStaleTimeMs = 5 * 60 * 1000

export const teamsQueryOptions = () =>
  queryOptions({
    queryKey: teamQueryKeys.list(),
    queryFn: getTeams,
    staleTime: teamsStaleTimeMs,
  })

export const useTeams = () => useQuery(teamsQueryOptions())

export const teamDetailQueryOptions = (teamId: number) =>
  queryOptions({
    queryKey: teamQueryKeys.detail(teamId),
    queryFn: () => getTeamById(teamId),
    staleTime: teamsStaleTimeMs,
  })

export const useTeam = (teamId?: number) =>
  useQuery({
    ...teamDetailQueryOptions(teamId ?? 0),
    enabled: teamId !== undefined,
  })
