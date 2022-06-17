import { resolve } from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

import { name } from './package.json'

export default defineConfig({
  plugins: [
    createVuePlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.js'),
      name: name.split('/').at(-1),
      fileName: format => `${name}.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
