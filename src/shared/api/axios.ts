import axios from 'axios'

import { API_CONFIG } from './config'

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'X-Auth-Token': API_CONFIG.apiKey,
  },
  timeout: 10000,
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      throw new Error('Network error')
    }

    const message = error.response?.data?.message || `API error ${error.response.status}`

    throw new Error(message)
  },
)
