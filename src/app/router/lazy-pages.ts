import { lazy } from 'react'

export const CompetitionCalendarPageLazy = lazy(
  () => import('@/pages/competition-calendar/ui/CompetitionCalendarPage'),
)
export const CompetitionsPageLazy = lazy(
  () => import('@/pages/competitions/ui/CompetitionsPage'),
)
export const TeamCalendarPageLazy = lazy(
  () => import('@/pages/team-calendar/ui/TeamCalendarPage'),
)
export const TeamsPageLazy = lazy(() => import('@/pages/teams/ui/TeamsPage'))
