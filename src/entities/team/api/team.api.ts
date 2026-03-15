import { baseQuery } from '@/shared/api/baseQuery'
import { API_ENDPOINTS } from '@/shared/api/endpoints'
import { parseSchema } from '@/shared/lib/zod/safeParse'

import { TeamsResponseSchema, type TeamsResponse } from './team.schema'

export const getTeams = async (): Promise<TeamsResponse> => {
  const data = await baseQuery({
    url: API_ENDPOINTS.teams,
    method: 'GET',
  })

  return parseSchema(TeamsResponseSchema, data)
}
