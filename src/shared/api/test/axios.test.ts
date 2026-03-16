import * as Sentry from '@sentry/react'
import { type AxiosError } from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { apiClient } from '../axios'

vi.mock('@sentry/react', () => ({
  captureException: vi.fn(),
}))

describe('apiClient response interceptor', () => {
  const rejectedHandler = apiClient.interceptors.response.handlers[0]?.rejected

  beforeEach(() => {
    vi.mocked(Sentry.captureException).mockClear()
  })

  it('captures and throws network errors', async () => {
    const axiosError = {
      config: {
        url: '/teams',
        method: 'get',
      },
    } as AxiosError

    expect(() => rejectedHandler?.(axiosError)).toThrow('Network error')

    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Network error' }),
      expect.objectContaining({
        tags: expect.objectContaining({
          errorType: 'network',
          handled: 'true',
        }),
        extra: expect.objectContaining({
          method: 'GET',
          url: '/teams',
        }),
      }),
    )
  })

  it('captures and throws api errors with response status', async () => {
    const axiosError = {
      config: {
        url: '/competitions',
        method: 'get',
      },
      response: {
        data: { message: 'Forbidden' },
        status: 403,
      },
    } as AxiosError

    expect(() => rejectedHandler?.(axiosError)).toThrow('Forbidden')

    expect(Sentry.captureException).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Forbidden' }),
      expect.objectContaining({
        tags: expect.objectContaining({
          errorType: 'api',
          handled: 'true',
        }),
        extra: expect.objectContaining({
          method: 'GET',
          url: '/competitions',
          status: 403,
        }),
      }),
    )
  })
})
