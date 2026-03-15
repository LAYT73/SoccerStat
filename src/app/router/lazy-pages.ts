import { lazy } from 'react'

export const CompetitionsPageLazy = lazy(
  () => import('@/pages/competitions/ui/CompetitionsPage'),
)
export const TeamsPageLazy = lazy(() => import('@/pages/teams/ui/TeamsPage'))
