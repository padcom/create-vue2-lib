import { defineConfig } from 'vitest/config'
import { createVuePlugin } from 'vite-plugin-vue2'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'

export default defineConfig({
  plugins: [
    createVuePlugin(),
    ScriptSetup(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [
      'vitest.setup.js'
    ],
  },
})
