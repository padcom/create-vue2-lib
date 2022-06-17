import { Action } from './Action.mjs'
import { print, println, execute } from '../utils.mjs'

export class InstallProjectDependenciesCommand extends Action {
  constructor() {
    super('install-project-dependencies-command')
  }

  async execute(options) {
    print('Installing dependencies...')
    const peerDependencies = [
      'vue@2',
    ]
    const devDependencies = [
      '@types/node',
      '@vue/test-utils@1.3.0',
      'c8@7.11.3',
      'concurrently',
      'jsdom',
      'sass',
      'rimraf',
      'unplugin-vue2-script-setup',
      'typescript',
      'vite',
      'vite-plugin-vue2',
      'vitest',
      'vue-template-compiler',
    ]
    await execute(`npm install --save-peer ${peerDependencies.join(' ')}`)
    await execute(`npm install --save-dev ${devDependencies.join(' ')}`)
    println('ok')

    return { projectDependenciesInitialized: true }
  }
}
