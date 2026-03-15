import MainLayout from '@/app/router/layouts/MainLayout'
import { CompetitionsPage } from '@/pages'

import { type RouteConfig } from './RouteTypes'

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <CompetitionsPage /> },
      { path: 'competition/:id', element: <>2</> },
      { path: 'teams', element: <>3</> },
      { path: 'team/:id', element: <>4</> },
    ],
  },
  { path: '*', element: <>Not Found</> },
]
