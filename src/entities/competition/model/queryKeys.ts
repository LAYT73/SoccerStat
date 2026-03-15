export const competitionQueryKeys = {
  all: ['competitions'] as const,
  list: () => [...competitionQueryKeys.all, 'list'] as const,
  detail: (competitionId: number) =>
    [...competitionQueryKeys.all, 'detail', competitionId] as const,
}
