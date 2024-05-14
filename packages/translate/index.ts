import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import { version } from './package.json'
import type { Plugin } from 'vite'

type TranslateConfig = {
  /**
   * output translate file suffix
   * @default .json
   */
  suffix?: string
}

export default function (config: TranslateConfig): Plugin {
  const { suffix = 'json' } = config
  return {
    name: 'memore-translate',
    version,
  }
}
