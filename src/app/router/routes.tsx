import MainLayout from '@/app/router/layouts/MainLayout'

import {
  CompetitionCalendarPageLazy,
  CompetitionsPageLazy,
  TeamCalendarPageLazy,
  TeamsPageLazy,
} from './lazy-pages'
import { type RouteConfig } from './RouteTypes'

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <CompetitionsPageLazy /> },
      { path: 'competition/:id', element: <CompetitionCalendarPageLazy /> },
      { path: 'teams', element: <TeamsPageLazy /> },
      { path: 'team/:id', element: <TeamCalendarPageLazy /> },
    ],
  },
  { path: '*', element: <>Not Found</> },
]
