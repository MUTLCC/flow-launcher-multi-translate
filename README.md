<p align="center">
<img src="./assets/icon.png" height="140">
</p>

<h1 align="center">
MultiTranslate
</h1>

<p align="center">
A Flow-Launcher plugin that translates text using multiple translation services.
</p>

## Features

![example1](./assets/example1.png)

``` bash
#  Basic usage
tr <text>

# Specify a target language
tr >fr <text>
# or
tr fr <text>

# Specify a source language
tr zh <text>

# Both source and target languages
tr zh>fr <text>
```

## Configuration

All configuration is saved in `FlowLauncher\app-x.xx.x\UserData\Plugins\MultiTranslate-x.x.x\config.json`.

Example configuration:

```json
{
  // [Required] The translation services to use.
  // The order here determines the order of the results.
  // Available services: youdao, google, bing, deeplx.
  "services": [
    "youdao",
    "google",
    "bing"
  ],
  // [Optional] DeepLX Personal Url. If you want to use DeepLX, you need to set this.
  "deeplxUrl": "<Your DeepLX Personal Url>",
  // [Optional] The source language. Default is "auto"
  "sourceLanguage": "auto",
  // [Optional] The target language. Default is "en"
  "targetLanguage": "en",
  // [Optional] The proxy URL. Default is empty.
  // Example: "http://127.0.1:7890"
  "proxyUrl": "<Your Proxy Url>"
}
```

## Language Codes List

I can only ensure the common languages are supported.

```typescript
export const languageCodesArr = [
  'auto',
  'zh',
  'zh_hant',
  'yue',
  'en',
  'ja',
  'ko',
  'fr',
  'es',
  'ru',
  'de',
  'it',
  'tr',
  'pt_pt',
  'pt_br',
  'vi',
  'id',
  'th',
  'ms',
  'ar',
  'hi',
  'mn_cy',
  'mn_mo',
  'km',
  'nb_no',
  'nn_no',
  'fa',
  'sv',
  'pl',
  'nl',
  'uk',
  'he',
  'bg',
  'cs',
  'da',
  'et',
  'fi',
  'el',
  'hu',
  'lv',
  'lt',
  'ro',
  'sk',
  'sl',
] as const
```
