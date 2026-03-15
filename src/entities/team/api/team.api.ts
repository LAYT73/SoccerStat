import { baseQuery } from '@/shared/api/baseQuery'
import { API_ENDPOINTS } from '@/shared/api/endpoints'
import { parseSchema } from '@/shared/lib/zod/safeParse'

import {
  TeamSchema,
  TeamsResponseSchema,
  type Team,
  type TeamsResponse,
} from './team.schema'

export const getTeams = async (): Promise<TeamsResponse> => {
  const data = await baseQuery({
    url: API_ENDPOINTS.teams,
    method: 'GET',
  })

  return parseSchema(TeamsResponseSchema, data)
}

export const getTeamById = async (teamId: number): Promise<Team> => {
  const data = await baseQuery({
    url: API_ENDPOINTS.teamById(teamId),
    method: 'GET',
  })

  return parseSchema(TeamSchema, data)
}
