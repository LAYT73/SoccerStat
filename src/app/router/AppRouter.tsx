import { Spin } from 'antd'
import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

import { routes } from './routes'

export function AppRouter() {
  const routing = useRoutes(routes)
  return (
    <Suspense
      fallback={<Spin size="large" style={{ display: 'block', margin: '100px auto' }} />}
    >
      {routing}
    </Suspense>
  )
}
