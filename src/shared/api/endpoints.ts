export const API_ENDPOINTS = {
  competitions: '/competitions',
  competitionById: (competitionId: number) => `/competitions/${competitionId}`,
  teams: '/teams',
  teamById: (teamId: number) => `/teams/${teamId}`,
  competitionMatches: (competitionId: number) => `/competitions/${competitionId}/matches`,
  teamMatches: (teamId: number) => `/teams/${teamId}/matches`,
} as const
