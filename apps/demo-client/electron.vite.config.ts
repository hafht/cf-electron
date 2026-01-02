import { defineConfig } from 'electron-vite'
import angular from '@analogjs/vite-plugin-angular'
import { resolve } from 'node:path'

export default defineConfig({
  main: {
    build: {
      sourcemap: true,
      rollupOptions: {
        // External workspace package - will be resolved at runtime from node_modules
        external: ['@creative-force/electron']
      }
    }
  },
  preload: {
    build: {
      sourcemap: true
    }
  },
  renderer: {
    root: 'src/renderer',
    plugins: [
      angular({
        tsconfig: resolve(__dirname, 'src/renderer/tsconfig.app.json')
      })
    ],
    build: {
      sourcemap: true
    },
    server: {
      port: 5173,
      strictPort: true,
      sourcemapIgnoreList: false
    }
  }
})
