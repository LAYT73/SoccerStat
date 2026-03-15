import { baseQuery } from '@/shared/api/baseQuery'
import { API_ENDPOINTS } from '@/shared/api/endpoints'
import { parseSchema } from '@/shared/lib/zod/safeParse'

import {
  CompetitionsResponseSchema,
  type CompetitionsResponse,
} from './competition.schema'

export const getCompetitions = async (): Promise<CompetitionsResponse> => {
  const data = await baseQuery({
    url: API_ENDPOINTS.competitions,
    method: 'GET',
  })

  return parseSchema(CompetitionsResponseSchema, data)
}
