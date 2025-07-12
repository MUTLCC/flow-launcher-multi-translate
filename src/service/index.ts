import type { AxiosInstance } from 'axios'
import type { Settings } from '../settings'
import * as bing from './bing'
import * as caiyun from './caiyun'
import * as deepl from './deepl'
import * as deeplx from './deeplx'
import * as google from './google'
import * as tencent from './tencent'
import * as transmart from './transmart'
import * as volcengine from './volcengine'
import * as youdao from './youdao'

const serviceModules = {
  bing,
  caiyun,
  deepl,
  deeplx,
  google,
  tencent,
  transmart,
  volcengine,
  youdao,
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
