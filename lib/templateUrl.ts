import ky from 'ky'

export const client = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_RESTAPI_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

export const apiUrl = process.env.NEXT_PUBLIC_RESTAPI_URL
