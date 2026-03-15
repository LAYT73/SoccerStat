export const API_ENDPOINTS = {
  competitions: '/competitions',
  teams: '/teams',
  competitionMatches: (competitionId: number) => `/competitions/${competitionId}/matches`,
  teamMatches: (teamId: number) => `/teams/${teamId}/matches`,
} as const
