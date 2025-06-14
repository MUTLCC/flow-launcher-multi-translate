import type { LanguageCode } from './service/language'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { config as loadEnv } from 'dotenv'
import baseConfig from '../config.json'

export interface Options {
  deeplxUrl: string
  services: string[]
  proxyUrl: string
  requestTimeout: number
  sourceLanguage: LanguageCode
  targetLanguage: LanguageCode
}

const _dirname = path.resolve((path.dirname(fileURLToPath(import.meta.url))), '..')
loadEnv({
  path: path.join(_dirname, '.env'),
})

const defaultConfig: Options = {
  deeplxUrl: '',
  services: [
    "youdao",
    "google",
    "bing"
  ],
  proxyUrl: '',
  requestTimeout: 3000,
  sourceLanguage: 'auto',
  targetLanguage: 'en',
}

const configData: Options = { ...defaultConfig, ...baseConfig as any }

configData.deeplxUrl = process.env.DEEPLX_URL || configData.deeplxUrl
configData.proxyUrl = process.env.PROXY_URL || configData.proxyUrl

export const config = configData

