import type { JSX } from 'react'

export interface RouteConfig {
  path: string
  element: JSX.Element
  children?: RouteConfig[]
}
