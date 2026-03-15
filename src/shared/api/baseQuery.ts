import { type AxiosRequestConfig } from 'axios'

import { apiClient } from './axios'

export async function baseQuery<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.request<T>(config)
  return data
}
