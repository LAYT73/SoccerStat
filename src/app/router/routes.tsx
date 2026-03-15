import MainLayout from '@/app/router/layouts/MainLayout'
import { APP_ROUTES } from '@/shared/consts/routes'

import {
  CompetitionCalendarPageLazy,
  CompetitionsPageLazy,
  NotFoundPageLazy,
  TeamCalendarPageLazy,
  TeamsPageLazy,
} from './lazy-pages'
import { type RouteConfig } from './RouteTypes'

export const routes: RouteConfig[] = [
  {
    path: APP_ROUTES.competitions.path,
    element: <MainLayout />,
    children: [
      { index: true, element: <CompetitionsPageLazy /> },
      {
        path: APP_ROUTES.competitionCalendar.relativePath,
        element: <CompetitionCalendarPageLazy />,
      },
      { path: APP_ROUTES.teams.path.slice(1), element: <TeamsPageLazy /> },
      {
        path: APP_ROUTES.teamCalendar.relativePath,
        element: <TeamCalendarPageLazy />,
      },
      { path: APP_ROUTES.notFound.path, element: <NotFoundPageLazy /> },
    ],
  },
]
