import type { AxiosInstance } from 'axios'
import type { Settings } from '../settings'
import * as baidu from './baidu'
import * as bing from './bing'
import * as caiyun from './caiyun'
import * as deepl from './deepl'
import * as deeplx from './deeplx'
import * as google from './google'
import * as mtranserver from './MTranServer'
import * as tencent from './tencent'
import * as transmart from './transmart'
import * as volcengine from './volcengine'
import * as youdao from './youdao'

const serviceModules = {
  baidu,
  bing,
  caiyun,
  deepl,
  deeplx,
  google,
  mtranserver,
  tencent,
  transmart,
  volcengine,
  youdao,
}

export const serviceNamesMap: Record<string, { en: string, zh: string }> = {
  baidu: { en: 'Baidu Translate', zh: '百度翻译' },
  bing: { en: 'Microsoft Translator', zh: '微软翻译' },
  caiyun: { en: 'Caiyun Translate', zh: '彩云小译' },
  deepl: { en: 'DeepL', zh: 'DeepL' },
  deeplx: { en: 'DeepLX', zh: 'DeepLX' },
  google: { en: 'Google Translate', zh: '谷歌翻译' },
  mtranserver: { en: 'MTranServer', zh: 'MTranServer' },
  tencent: { en: 'Tencent Translate', zh: '腾讯翻译君' },
  transmart: { en: 'Transmart', zh: '腾讯交互翻译' },
  volcengine: { en: 'Volcengine Translate', zh: '火山翻译' },
  youdao: { en: 'Youdao Translate', zh: '有道翻译' },
}

const services: Record<string, {
  translate: (text: string, from: string, to: string, axiosInstance: AxiosInstance, _options: Settings) => Promise<string>
  languagesMap: Record<string, string>
}> = {}

for (const [name, module] of Object.entries(serviceModules)) {
  services[name] = {
    translate: module.translate,
    languagesMap: module.languagesMap,
  }
}

export { services }
