import type { Settings } from '../settings'
import type { LanguagesMap } from './language'
import { type AxiosInstance, isAxiosError } from 'axios'
import { getRandomInt } from '../utils'

export async function translate(
  text: string,
  from: string,
  to: string,
  axiosInstance: AxiosInstance,
  _options: Settings,
): Promise<string> {
  try {
    const url = 'https://www2.deepl.com/jsonrpc'
    const rand = getRandomInt(100000, 200000)
    const body = {
      jsonrpc: '2.0',
      method: 'LMT_handle_texts',
      params: {
        splitting: 'newlines',
        lang: {
          source_lang_user_selected: from !== 'auto' ? from.slice(0, 2) : 'auto',
          target_lang: to.slice(0, 2),
        },
        texts: [{ text, requestAlternatives: 3 }],
        timestamp: Date.now() + (text.match(/[a-z]/gi) || []).length,
      },
      id: rand,
    }

    let bodyStr = JSON.stringify(body)
    if ((rand + 5) % 29 === 0 || (rand + 3) % 13 === 0) {
      bodyStr = bodyStr.replace('"method":"', '"method" : "')
    }
    else {
      bodyStr = bodyStr.replace('"method":"', '"method": "')
    }

    const response = await axiosInstance.post(url, bodyStr, {
      headers: { 'Content-Type': 'application/json' },
    })
    const result = response.data
    return result.result.texts[0].text.trim()
  }
  catch (error) {
    if (isAxiosError(error) && error.response) {
      return `${JSON.stringify(error)}\n${error.response.data}`
    }
    return JSON.stringify(error)
  }
}

// https://github.com/missuo/bob-plugin-deeplx/blob/main/src/lang.js
export const languagesMap: LanguagesMap = {
  auto: 'auto',
  zh: 'zh',
  zh_hant: 'zh',
  en: 'en',
  bg: 'bg',
  cs: 'cs',
  da: 'da',
  nl: 'nl',
  et: 'et',
  fi: 'fi',
  fr: 'fr',
  de: 'de',
  el: 'el',
  hu: 'hu',
  id: 'id',
  it: 'it',
  ja: 'ja',
  lv: 'lv',
  lt: 'lt',
  pl: 'pl',
  pt_pt: 'pt-pt',
  pt_br: 'pt-br',
  ro: 'ro',
  ru: 'ru',
  sk: 'sk',
  sl: 'sl',
  es: 'es',
  sv: 'sv',
  tr: 'tr',
  uk: 'uk',
}
