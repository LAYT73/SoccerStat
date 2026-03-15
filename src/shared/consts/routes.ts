type RouteLabel = 'Лиги' | 'Команды'

interface StaticRouteConfig {
  path: string
  label?: RouteLabel
}

interface DynamicRouteConfig {
  path: string
  relativePath: string
  pathPrefix: string
  getPath: (id: number | string) => string
}

export const APP_ROUTES = {
  competitions: {
    path: '/',
    label: 'Лиги',
  },
  competitionCalendar: {
    path: '/competition/:id',
    relativePath: 'competition/:id',
    pathPrefix: '/competition/',
    getPath: (id: number | string) => `/competition/${id}`,
  },
  teams: {
    path: '/teams',
    label: 'Команды',
  },
  teamCalendar: {
    path: '/team/:id',
    relativePath: 'team/:id',
    pathPrefix: '/team/',
    getPath: (id: number | string) => `/team/${id}`,
  },
  notFound: {
    path: '*',
  },
} as const satisfies {
  competitions: StaticRouteConfig
  competitionCalendar: DynamicRouteConfig
  teams: StaticRouteConfig
  teamCalendar: DynamicRouteConfig
  notFound: StaticRouteConfig
}

export const NAVIGATION_ROUTES = [
  {
    key: APP_ROUTES.competitions.path,
    label: APP_ROUTES.competitions.label,
  },
  {
    key: APP_ROUTES.teams.path,
    label: APP_ROUTES.teams.label,
  },
]

export const getSelectedNavigationPath = (pathname: string) => {
  if (
    pathname === APP_ROUTES.teams.path ||
    pathname.startsWith(APP_ROUTES.teamCalendar.pathPrefix)
  ) {
    return APP_ROUTES.teams.path
  }

  return APP_ROUTES.competitions.path
}
