import * as Sentry from '@sentry/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './app/App.tsx'

const sentryDsn = import.meta.env.VITE_SENTRY_DSN?.trim()

if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    enabled: true,
    environment: import.meta.env.MODE,
    sendDefaultPii: false,
    tracesSampleRate: 0.1,
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
