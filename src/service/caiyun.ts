import type { AxiosInstance } from 'axios'
import type { Settings } from '../settings'
import type { LanguagesMap } from './language'
import { formatError } from '../utils'

export async function translate(
  text: string,
  from: string,
  to: string,
  axiosInstance: AxiosInstance,
  _options: Settings,
): Promise<string> {
  const url = 'https://interpreter.cyapi.cn/v1/translator'

  try {
    const response = await axiosInstance.post(url, {
      source: text,
      detect: true,
      os_type: 'ios',
      device_id: 'F1F902F7-1780-4C88-848D-71F35D88A602',
      trans_type: `${from}2${to}`,
      media: 'text',
      request_id: Date.now() % 1000000000,
      user_id: '',
      dict: true,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'x-authorization': 'token ssdj273ksdiwi923bsd9',
        'user-agent': 'caiyunInterpreter/5 CFNetwork/1404.0.5 Darwin/22.3.0',
      },
    })

    const result = response.data.target
    return result
  }
  catch (error) {
    return formatError(error)
  }
}

// https://docs.caiyunapp.com/lingocloud-api/index.html#%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%AD%E8%A8%80
export const languagesMap: LanguagesMap = {
  auto: 'auto',
  zh: 'zh',
  zh_hant: 'zh-Hant',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  de: 'de',
  es: 'es',
  fr: 'fr',
  it: 'it',
  pt_br: 'pt',
  pt_pt: 'pt',
  ru: 'ru',
  tr: 'tr',
  vi: 'vi',
}
