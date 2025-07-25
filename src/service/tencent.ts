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
  const url = 'https://wxapp.translator.qq.com/api/translate'
  try {
    const response = await axiosInstance.get(url, {
      params: {
        source: 'auto',
        target: 'auto',
        sourceText: text,
        platform: 'WeChat_APP',
        guid: 'oqdgX0SIwhvM0TmqzTHghWBvfk22',
        candidateLangs: `${from}|${to}`,
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.32(0x18002035) NetType/WIFI Language/zh_TW',
        'Content-Type': 'application/json',
        'Host': 'wxapp.translator.qq.com',
        'Referer': 'https://servicewechat.com/wxb1070eabc6f9107e/117/page-frame.html',
      },
    })

    const result = response.data.targetText
    return result
  }
  catch (error) {
    return formatError(error)
  }
}

// https://cloud.tencent.com/document/product/551/15619
export const languagesMap: LanguagesMap = {
  auto: 'auto',
  zh: 'zh',
  zh_hant: 'zh-TW',
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
  hi: 'hi',
}
