import type { GetMatchesParams } from '../api/match.api'

export const matchQueryKeys = {
  all: ['matches'] as const,
  list: (params: GetMatchesParams) =>
    [
      ...matchQueryKeys.all,
      'list',
      params.competitionId ?? null,
      params.teamId ?? null,
      params.dateFrom ?? null,
      params.dateTo ?? null,
    ] as const,
}
