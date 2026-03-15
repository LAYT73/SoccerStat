export const API_CONFIG = {
  baseURL: import.meta.env.PROD ? import.meta.env.VITE_FOOTBALL_DATA_API_URL : '/api',
  apiKey: import.meta.env.VITE_FOOTBALL_DATA_API_KEY,
}
