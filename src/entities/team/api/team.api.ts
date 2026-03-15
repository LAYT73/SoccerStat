import { baseQuery } from '@/shared/api/baseQuery'
import { parseSchema } from '@/shared/lib/zod/safeParse'

import { TeamsResponseSchema, type TeamsResponse } from './team.schema'

export const getTeams = async (): Promise<TeamsResponse> => {
  const data = await baseQuery({
    url: '/teams',
    method: 'GET',
  })

  return parseSchema(TeamsResponseSchema, data)
}
