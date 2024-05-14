import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import translatePlugin from 'translate'
/**
 * Electron-vite provides many default configurations, and if you don't pay
 * attention to them, it may cause some issues.
 *
 * https://cn-evite.netlify.app/config/
 *
 */
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: {
        entry: 'main/index.ts'
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    build: {
      lib: {
        entry: 'preload/index.ts'
      }
    }
  },
  renderer: {
    // keep web dev style
    root: 'src',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    build: {
      rollupOptions: {
        input: 'index.html'
      }
    },
    plugins: [react(), translatePlugin({})]
  }
})
