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
  const url = 'https://transmart.qq.com/api/imt'
  try {
    const response = await axiosInstance.post(url, {
      header: {
        fn: 'auto_translation',
        client_key: 'browser-chrome-110.0.0-Mac OS-df4bd4c5-a65d-44b2-a40f-42f34f3535f2-1677486696487',
      },
      type: 'plain',
      model_category: 'normal',
      source: {
        lang: from,
        text_list: [text],
      },
      target: {
        lang: to,
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
        'referer': 'https://transmart.qq.com/zh-CN/index',
      },
    })
    const result: string[] = response.data.auto_translation || []
    return result.join('\n').trim()
  }
  catch (error) {
    return formatError(error)
  }
}

// https://docs.qq.com/doc/DY2NxUWpmdnB2RXV3
export const languagesMap: LanguagesMap = {
  auto: 'auto',
  zh: 'zh',
  zh_hant: 'zh-TW',
  yue: 'yue',
  en: 'en',
  ja: 'ja',
  ko: 'ko',
  fr: 'fr',
  es: 'es',
  ru: 'ru',
  de: 'de',
  it: 'it',
  tr: 'tr',
  pt_pt: 'pt',
  pt_br: 'pt',
  vi: 'vi',
  id: 'id',
  th: 'th',
  ms: 'ms',
  ar: 'ar',
  km: 'km',
}
