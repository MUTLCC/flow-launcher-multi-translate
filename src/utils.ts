import { isAxiosError } from 'axios'

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function formatError(error: unknown): string {
  if (isAxiosError(error) && error.response)
    return `${JSON.stringify(error.response.data)}`
  return JSON.stringify(error)
}
