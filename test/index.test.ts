import { describe, expect, it } from 'vitest'
import { config } from '../src/config'
import { parsePrompt } from '../src/index'
import { languagesMap as bingLanguages, translate as bingTranslate } from '../src/service/bing'
import { languagesMap as deeplxLanguages, translate as deeplxTranslate } from '../src/service/deeplx'
import { languagesMap as googleLanguages, translate as googleTranslate } from '../src/service/google'
import { languagesMap as youdaoLanguages, translate as youdaoTranslate } from '../src/service/youdao'

describe('translate', () => {
  it('deeplx', async () => {
    const res = await deeplxTranslate(
      'an apple a day keeps the doctor away. an banana a day keeps you away from everyone.',
      deeplxLanguages.en!,
      deeplxLanguages.zh!,
      config,
    )
    expect(res).toMatchInlineSnapshot(`"每天一个苹果，医生远离你；每天一根香蕉，你远离所有人。"`)
  })

  it('google', async () => {
    const res = await googleTranslate(
      'an apple a day keeps the doctor away. an banana a day keeps you away from everyone.',
      googleLanguages.en!,
      googleLanguages.zh!,
      config,
    )
    expect(res).toMatchInlineSnapshot(`"一天苹果将医生远离。每天的香蕉使您远离所有人。"`)
  })

  it('bing', async () => {
    const res = await bingTranslate(
      'an apple a day keeps the doctor away. an banana a day keeps you away from everyone.',
      bingLanguages.en!,
      bingLanguages.zh!,
      config,
    )
    expect(res).toMatchInlineSnapshot(`"一天一个苹果让医生远离。一天一根香蕉让你远离所有人。"`)
  })

  it.only('youdao', async () => {
    const res = await youdaoTranslate(
      'an apple a day keeps the doctor away. an banana a day keeps you away from everyone.',
      youdaoLanguages.en!,
      'he',
      config,
    )
    expect(res).toMatchInlineSnapshot(`"{}"`)
  })
})

describe.skip('common', () => {
  it.skip('proxy parse', () => {
    function parseProxyUrl(proxyUrl: string) {
      const url = new URL(proxyUrl)
      return {
        protocol: url.protocol.replace(':', ''),
        host: url.hostname,
        port: Number.parseInt(url.port),
      }
    }

    expect(parseProxyUrl('http://127.0.0.1:7890')).toMatchInlineSnapshot(`
      {
        "host": "127.0.0.1",
        "port": 7890,
        "protocol": "http",
      }
    `)
  })

  it('parse prompt', () => {
    expect(parsePrompt('zh ', 'fr', 'ro')).toMatchInlineSnapshot(`
      {
        "sourceLanguage": "fr",
        "targetLanguage": "zh",
        "text": "",
      }
    `)
  })
})
