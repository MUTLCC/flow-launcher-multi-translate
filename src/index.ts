import type { LanguageCode } from './service/language'
import { exec } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Flow } from 'flow-plugin'
import { config } from './config'
import { services as servicesData } from './service/index'
import { languageCodesArr, languageNamesMap } from './service/language'

const _dirname = path.resolve((path.dirname(fileURLToPath(import.meta.url))), '..')
const assetsPath = path.join(_dirname, 'assets')
const { services } = config

function main() {
  const flow = new Flow({ keepOrder: true })

  // no services configured
  if (!services || services.length === 0) {
    flow.add({
      title: 'No services configured',
      subtitle: 'Please check your configuration.',
      icoPath: `${assetsPath}/warning.png`,
    })
    return
  }
  // unsupported source language
  if (languageNamesMap[config.sourceLanguage] === undefined) {
    flow.add({
      title: 'Unsupported source language',
      subtitle: `The source language "${config.sourceLanguage}" is not supported.`,
      icoPath: `${assetsPath}/warning.png`,
    })
    return
  }
  // unsupported target language
  if (languageNamesMap[config.targetLanguage] === undefined) {
    flow.add({
      title: 'Unsupported target language',
      subtitle: `The target language "${config.targetLanguage}" is not supported.`,
      icoPath: `${assetsPath}/warning.png`,
    })
    return
  }

  flow.on('query', async ({ prompt }, response) => {
    // response.add({
    //   title: `#${prompt}#`,
    // })
    // return
    // parse prompt to prefix and text
    const { sourceLanguage, targetLanguage, text } = parsePrompt(prompt, config.sourceLanguage, config.targetLanguage)

    if (!text || text.trim().length === 0) {
      response.add({
        title: `${languageNamesMap[sourceLanguage].en} → ${languageNamesMap[targetLanguage].en}`,
        icoPath: `${assetsPath}/info.png`,
      })
      return
    }

    // response.add({
    //   title: `${sourceLanguage}  ${targetLanguage}  #${text}#`,
    // })
    // return

    const translatePromises = services.map(async (name) => {
      const service = servicesData[name]
      if (!service)
        return null
      if (service.languagesMap[sourceLanguage] === undefined) {
        return { result: 'Unsupported source language', name }
      }
      if (service.languagesMap[targetLanguage] === undefined) {
        return { result: 'Unsupported target language', name }
      }
      const result = await service.translate(
        text,
        service.languagesMap[sourceLanguage],
        service.languagesMap[targetLanguage],
        config,
      )
      return { result, name }
    })

    const results = await Promise.all(translatePromises)
    const responseItems = results
      .filter(item => item !== null)
      .map(({ name, result }) => {
        return {
          title: result,
          subtitle: `${languageNamesMap[sourceLanguage].en} → ${languageNamesMap[targetLanguage].en}  [${name}]`,
          icoPath: `${assetsPath}/service_icon/${name}.png`,
          jsonRPCAction: Flow.Actions.custom('copy', [result]),
        }
      })

    response.add(...responseItems)
  })

  flow.on('copy', ({ parameters: [result] }) => {
    exec(`echo ${result} | clip`)
  })
}

export function parsePrompt(
  prompt: string,
  oldSourceLanguage: LanguageCode,
  oldTargetLanguage: LanguageCode,
): {
    sourceLanguage: LanguageCode
    targetLanguage: LanguageCode
    text: string
  } {
  prompt = prompt.trimStart()

  // Check if there is prefix
  const spaceIndex = prompt.indexOf(' ')
  if (spaceIndex === -1 || spaceIndex > 15) {
    return {
      sourceLanguage: oldSourceLanguage,
      targetLanguage: oldTargetLanguage,
      text: prompt,
    }
  }

  const prefix = prompt.substring(0, spaceIndex)
  const rest = prompt.substring(spaceIndex + 1).trim()
  // console.log(`Prefix: "${prefix}", Rest: "${rest}"`)

  // Part 1: A>B
  const match1 = prefix.match(/^([a-z_]+)>([a-z_]+)$/)
  if (match1) {
    const [_, source, target] = match1
    if (languageCodesArr.includes(source as any) && languageCodesArr.includes(target as any)) {
      return {
        sourceLanguage: source as LanguageCode,
        targetLanguage: target as LanguageCode,
        text: rest,
      }
    }
  }

  // Part 2: A>
  const match2 = prefix.match(/^([a-z_]+)>$/)
  if (match2) {
    const [_, source] = match2
    // console.log(languageCodesArr.includes(source))
    if (languageCodesArr.includes(source as any)) {
      return {
        sourceLanguage: source as LanguageCode,
        targetLanguage: oldTargetLanguage,
        text: rest,
      }
    }
  }

  // Part 3: B or >B
  const match3 = prefix.match(/^>?([a-z_]+)$/)
  if (match3) {
    const [_, target] = match3
    if (languageCodesArr.includes(target as any)) {
      return {
        sourceLanguage: oldSourceLanguage,
        targetLanguage: target as LanguageCode,
        text: rest,
      }
    }
  }

  // Default case
  return {
    sourceLanguage: oldSourceLanguage,
    targetLanguage: oldTargetLanguage,
    text: prompt,
  }
}

main()
