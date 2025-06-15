import type { LanguageCode } from './service/language'

export interface Settings {
  services: string[]
  requestTimeout: number
  proxyUrl: string
  deeplxUrl: string
  sourceLanguageCode: LanguageCode
  targetLanguageCode: LanguageCode
}

export function parseSettings(settings: Record<string, string>): Settings {
  const services = (settings.services as string).split('\n').map(i => i.trim()).filter(i => i)
  let requestTimeout = Number.parseInt(settings.requestTimeout, 10)
  if (Number.isNaN(requestTimeout))
    requestTimeout = 3000
  const proxyUrl = settings.proxyUrl || ''
  const deeplxUrl = settings.deeplxUrl || ''
  const sourceLanguageCode = settings.sourceLanguageCode as LanguageCode || 'auto'
  const targetLanguageCode = settings.targetLanguageCode as LanguageCode || 'zh'

  return {
    services,
    requestTimeout,
    proxyUrl,
    deeplxUrl,
    sourceLanguageCode,
    targetLanguageCode,
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
