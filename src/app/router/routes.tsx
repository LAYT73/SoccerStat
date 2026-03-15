import MainLayout from '@/app/router/layouts/MainLayout'

import { type RouteConfig } from './RouteTypes'

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <>1</> },
      { path: 'competition/:id', element: <>2</> },
    ],
  },
  { path: '*', element: <>Not Found</> },
]
