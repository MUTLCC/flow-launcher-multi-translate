import type { Settings } from './settings'
import axios from 'axios'
// import { config } from './settings'

type AxiosBaseConfig = Parameters<typeof axios.create>[0]

function parseProxyUrl(proxyUrl: string): AxiosBaseConfig {
  const url = new URL(proxyUrl)
  return {
    proxy: {
      protocol: url.protocol.replace(':', ''),
      host: url.hostname,
      port: Number.parseInt(url.port),
    },
  }
}

export function createAxiosInstance(settings: Settings) {
// handle proxy configuration
  const proxyUrl = settings.proxyUrl || ''
  let axiosProxyConfig: AxiosBaseConfig = {}
  if (proxyUrl) {
    axiosProxyConfig = parseProxyUrl(proxyUrl)
  }

  const axiosBaseConfig: AxiosBaseConfig = {
    timeout: settings.requestTimeout,
  }

  return axios.create({
    ...axiosBaseConfig,
    ...axiosProxyConfig,
  })
}
