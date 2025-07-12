import type { LanguageCode } from './service/language'
import { logger } from './logger'

export interface Settings {
  services: string[]
  requestTimeout: number
  proxyUrl: string
  deeplxUrl: string
  sourceLanguageCode: LanguageCode
  targetLanguageCode: LanguageCode
  languagePairs: string[]
  triggerKeyword: string
  interfaceLanguage: 'en' | 'zh'
}

export function parseSettings(settings: Record<string, string>): Settings {
  const services = (settings.services as string).split('\n').map(i => i.trim().toLowerCase()).filter(i => i)
  let requestTimeout = Number.parseInt(settings.requestTimeout, 10)
  if (Number.isNaN(requestTimeout))
    requestTimeout = 3000
  const proxyUrl = settings.proxyUrl || ''
  const deeplxUrl = settings.deeplxUrl || ''
  const sourceLanguageCode = settings.sourceLanguageCode as LanguageCode || 'auto'
  const targetLanguageCode = settings.targetLanguageCode as LanguageCode || 'zh'
  const languagePairs = (settings.languagePairs || '').split('\n').map(i => i.trim()).filter(i => i)
  const triggerKeyword = settings.triggerKeyword || 'tr'
  const interfaceLanguage = settings.interfaceLanguage === 'English' ? 'en' : 'zh'

  logger.info(settings)
  return {
    services,
    requestTimeout,
    proxyUrl,
    deeplxUrl,
    sourceLanguageCode,
    targetLanguageCode,
    languagePairs,
    triggerKeyword,
    interfaceLanguage,
  }
}

// const defaultSettings: Settings = {
//   deeplxUrl: '',
//   services: [
//     'youdao',
//     'google',
//     'bing',
//   ],
//   proxyUrl: '',
//   requestTimeout: 3000,
//   sourceLanguage: 'auto',
//   targetLanguage: 'en',
// }
