import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'icon',
      warn: true,
      cdn: 'https://esm.sh/',
    }),
  ],
  safelist: [],
})
