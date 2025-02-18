import type { SwaggerConfigs } from 'swagger-ui-dist'

export type DistSwaggerUIOptions = {
  configUrl?: SwaggerConfigs['configUrl']
  deepLinking?: SwaggerConfigs['deepLinking']
  presets?: string[]
  plugins?: string[]
  spec?: SwaggerConfigs['spec']
  url?: SwaggerConfigs['url']
  urls?: SwaggerConfigs['urls']
  layout?: SwaggerConfigs['layout']
  docExpansion?: SwaggerConfigs['docExpansion']
  maxDisplayedTags?: SwaggerConfigs['maxDisplayedTags']
  operationsSorter?: string
  requestInterceptor?: string
  responseInterceptor?: string
}

const RENDER_TYPE = {
  STRING_ARRAY: 'string_array',
  STRING: 'string',
  JSON_STRING: 'json_string',
  RAW: 'raw',
} as const

const RENDER_TYPE_MAP = {
  configUrl: RENDER_TYPE.STRING,
  deepLinking: RENDER_TYPE.RAW,
  presets: RENDER_TYPE.STRING_ARRAY,
  plugins: RENDER_TYPE.STRING_ARRAY,
  spec: RENDER_TYPE.JSON_STRING,
  url: RENDER_TYPE.STRING,
  urls: RENDER_TYPE.JSON_STRING,
  layout: RENDER_TYPE.STRING,
  docExpansion: RENDER_TYPE.STRING,
  maxDisplayedTags: RENDER_TYPE.RAW,
  operationsSorter: RENDER_TYPE.RAW,
  requestInterceptor: RENDER_TYPE.RAW,
  responseInterceptor: RENDER_TYPE.RAW,
} as const satisfies Record<
  keyof DistSwaggerUIOptions,
  (typeof RENDER_TYPE)[keyof typeof RENDER_TYPE]
>

export const renderSwaggerUIOptions = (options: DistSwaggerUIOptions) => {
  const optionsStrings = Object.entries(options)
    .map(([k, v]) => {
      const key = k as keyof typeof RENDER_TYPE_MAP
      if (RENDER_TYPE_MAP[key] === RENDER_TYPE.STRING) {
        return `${key}: '${v}'`
      }
      if (RENDER_TYPE_MAP[key] === RENDER_TYPE.STRING_ARRAY) {
        if (!Array.isArray(v)) return ''
        return `${key}: [${v.map((ve) => `${ve}`).join(',')}]`
      }
      if (RENDER_TYPE_MAP[key] === RENDER_TYPE.JSON_STRING) {
        return `${key}: ${JSON.stringify(v)}`
      }
      if (RENDER_TYPE_MAP[key] === RENDER_TYPE.RAW) {
        return `${key}: ${v}`
      }
      return ''
    })
    .join(',')

  return optionsStrings
}
