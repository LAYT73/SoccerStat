import MainLayout from '@/app/router/layouts/MainLayout'

import { CompetitionsPageLazy, TeamsPageLazy } from './lazy-pages'
import { type RouteConfig } from './RouteTypes'

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <CompetitionsPageLazy /> },
      { path: 'competition/:id', element: <>2</> },
      { path: 'teams', element: <TeamsPageLazy /> },
      { path: 'team/:id', element: <>4</> },
    ],
  },
  { path: '*', element: <>Not Found</> },
]
