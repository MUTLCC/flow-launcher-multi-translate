import type { AxiosInstance } from 'axios'
import type { Settings } from '../settings'
import * as bing from './bing'
import * as deeplx from './deeplx'
import * as google from './google'
import * as youdao from './youdao'

const serviceModules = {
  bing,
  deeplx,
  google,
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
