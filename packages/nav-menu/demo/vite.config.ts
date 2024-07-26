import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteVuePlugin from '@vitejs/plugin-vue'

export default defineConfig(() => {
  return {
    plugins: [viteVuePlugin()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, '.index.html'),
        },
      },
    },
  }
})
