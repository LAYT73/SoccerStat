import { useQuery } from '@tanstack/react-query'

import { getCompetitions } from '../api/competition.api'

export const useCompetitions = () =>
  useQuery({
    queryKey: ['competitions'],
    queryFn: getCompetitions,
  })
