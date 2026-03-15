export const teamQueryKeys = {
  all: ['teams'] as const,
  list: () => [...teamQueryKeys.all, 'list'] as const,
  detail: (teamId: number) => [...teamQueryKeys.all, 'detail', teamId] as const,
}
