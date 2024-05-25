import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      prefix: 'icon',
      warn: true,
      cdn: 'https://esm.sh/',
    }),
  ],
  safelist: [],
})
