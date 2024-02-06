export type Env = {
  apiUrl: string
}

const apiUrl = process.env.EXPO_PUBLIC_API_URL

if (!apiUrl) {
  throw new Error('API is not set')
}

export const env: Env = {
  apiUrl
}