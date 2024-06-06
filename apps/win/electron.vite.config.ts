import { resolve } from 'path'
import {
  type UserConfigExport,
  defineConfig,
  externalizeDepsPlugin,
} from 'electron-vite'
import viteVuePlugin from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig(() => {
  const host = '127.0.0.1'
  const port = 3000
  const config: UserConfigExport = {
    main: {
      plugins: [externalizeDepsPlugin()],
      build: {
        lib: {
          entry: 'main/index.ts',
        },
      },
    },
    preload: {
      plugins: [externalizeDepsPlugin()],
      build: {
        lib: {
          entry: 'preload/index.ts',
        },
      },
    },
    renderer: {
      // keep web dev style
      root: 'src',
      server: {
        host,
        port,
      },
      resolve: {
        alias: {
          '@': resolve('src'),
        },
      },
      build: {
        rollupOptions: {
          input: 'index.html',
        },
      },
      plugins: [
        viteVuePlugin(),
        ElementPlus({}),
        UnoCSS({ configFile: '../../uno.config.ts' }),
      ],
    },
  }

  return config
})
