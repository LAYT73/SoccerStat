import * as Sentry from '@sentry/react'
import axios from 'axios'

import { API_CONFIG } from './config'

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestMethod = error.config?.method?.toUpperCase()
    const requestUrl = error.config?.url

    if (!error.response) {
      const networkError = new Error('Network error')

      Sentry.captureException(networkError, {
        tags: {
          errorType: 'network',
          handled: 'true',
        },
        extra: {
          method: requestMethod,
          url: requestUrl,
        },
      })

      throw networkError
    }

    const message = error.response?.data?.message || `API error ${error.response.status}`
    const apiError = new Error(message)

    Sentry.captureException(apiError, {
      tags: {
        errorType: 'api',
        handled: 'true',
      },
      extra: {
        method: requestMethod,
        url: requestUrl,
        status: error.response.status,
      },
    })

    throw apiError
  },
)
