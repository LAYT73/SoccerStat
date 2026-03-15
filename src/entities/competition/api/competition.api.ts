import { baseQuery } from '@/shared/api/baseQuery'
import { parseSchema } from '@/shared/lib/zod/safeParse'

import {
  CompetitionsResponseSchema,
  type CompetitionsResponse,
} from './competition.schema'

export const getCompetitions = async (): Promise<CompetitionsResponse> => {
  const data = await baseQuery({
    url: '/competitions',
    method: 'GET',
  })

  return parseSchema(CompetitionsResponseSchema, data)
}
