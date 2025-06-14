import axios from 'axios'
import { config } from './config'

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

// handle proxy configuration
const proxyUrl = config.proxyUrl || ''
let axiosProxyConfig: AxiosBaseConfig = {}
if (proxyUrl) {
  axiosProxyConfig = parseProxyUrl(proxyUrl)
}

const axiosBaseConfig: AxiosBaseConfig = {
  timeout: config.requestTimeout,
}

const instance = axios.create({
  ...axiosBaseConfig,
  ...axiosProxyConfig,
})

export default instance
