import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'

export default defineConfig(({ command }) => {
  const config: UserConfig = {}

  if (command === 'serve') {
    config.build = {
      rollupOptions: {
        input: {
          site: resolve(__dirname, 'site/index.html'),
        },
      },
    }
    config.server = {
      open: '/site/index.html',
    }
  }

  if (command === 'build') {
    config.build = {
      lib: {
        entry: resolve(__dirname, 'src/animatedSignature.ts'),
        name: 'animated-signature',
        fileName: 'AnimatedSignature',
      },
    }
  }

  return config
})
