import type { Settings } from '../settings'
import type { LanguagesMap } from './language'
import { type AxiosInstance, isAxiosError } from 'axios'

export async function translate(
  text: string,
  from: string,
  to: string,
  axiosInstance: AxiosInstance,
  _options: Settings,
): Promise<string> {
  const url = 'https://translate.volcengine.com/crx/translate/v1'
  try {
    const response = await axiosInstance.post(
      url,
      {
        text,
        source_language: from,
        target_language: to,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return response.data.translation
  }
  catch (error) {
    if (isAxiosError(error) && error.response)
      return `${JSON.stringify(error)}\n${error.response.data}`
    return JSON.stringify(error)
  }
}

// https://www.volcengine.com/docs/4640/35107
export const languagesMap: LanguagesMap = {
  auto: 'auto',
  zh: 'zh',
  zh_hant: 'zh-Hant',
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
  hi: 'hi',
  mn_cy: 'mn',
  mn_mo: 'mn',
  km: 'km',
  nb_no: 'nb',
  nn_no: 'no',
  fa: 'fa',
  sv: 'sv',
  pl: 'pl',
  nl: 'nl',
  uk: 'uk',
  he: 'he',
  bg: 'bg',
  cs: 'cs',
  da: 'da',
  et: 'et',
  fi: 'fi',
  el: 'el',
  hu: 'hu',
  lv: 'lv',
  lt: 'lt',
  ro: 'ro',
  sk: 'sk',
  sl: 'sl',
}
