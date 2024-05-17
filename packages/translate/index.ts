import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { version } from './package.json'
import type { Plugin, PluginOption } from 'vite'

type TranslateConfig = {
  /**
   * output translate file suffix
   * @default .json
   */
  suffix?: string
}

export default function (config: TranslateConfig): PluginOption {
  const { suffix = 'json' } = config
  return {
    name: 'memore-translate',
    version,
    // options(inputOptions /** InputOptions is not complete */) {
    //   return null
    // },
    // buildStart(
    //   fullOptions /** it takes the transformations by all options hooks into account and also contains the right default values for unset options. */,
    // ) {
    //   console.log(`this hook is build start: ${fullOptions}`)
    // },
    // resolveId() {
    //   return null
    // },
    transform(code, id, options) {
      if (!/\.[js|ts|jsx|tsx]$/.test(id)) return code
      console.log(`this hooks is transform and code is: ${code}`)
      // const ast = parse(code, {
      //   sourceType: 'unambiguous',
      //   plugins: ['jsx', 'typescript', 'decorators-legacy'],
      // })

      return code
    },
  }
}
