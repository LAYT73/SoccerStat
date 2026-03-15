export const competitionQueryKeys = {
  all: ['competitions'] as const,
  list: () => [...competitionQueryKeys.all, 'list'] as const,
}
