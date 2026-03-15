import { formatMatchDate } from '@/shared/lib/date/timezone'

import type { Match, MatchesResponse } from '../api/match.schema'

export type MatchView = Match & {
  localDate: string
}

export const mapMatchToView = (match: Match): MatchView => ({
  ...match,
  localDate: formatMatchDate(match.utcDate),
})

export const mapMatchesToView = (response: MatchesResponse): MatchView[] =>
  response.matches.map(mapMatchToView)
