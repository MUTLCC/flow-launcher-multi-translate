import type { Options } from '../config'
import type { LanguagesMap } from './language'
import { isAxiosError } from 'axios'
import axios from '../axios'

export async function translate(text: string, from: string, to: string, _options: Options): Promise<string> {
  const deeplxUrl = _options.deeplxUrl
  try {
    const response = await axios.post(
      deeplxUrl,
      {
        text,
        source_lang: from,
        target_lang: to,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data.data
  }
  catch (error) {
    if (isAxiosError(error) && error.response)
      return `${JSON.stringify(error)}\n${error.response.data}`
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
