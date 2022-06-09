import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

import packageJson from './package.json'

const name = packageJson.name.split('/').at(-1)

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'index.ts'),
      name,
      fileName: format => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: [ 'vue' ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    createVuePlugin(),
  ],
})
