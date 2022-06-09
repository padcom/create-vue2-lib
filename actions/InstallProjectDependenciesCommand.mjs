import { Action } from './Action.mjs'
import { print, println, execute } from '../utils.mjs'

export class InstallProjectDependenciesCommand extends Action {
  constructor() {
    super('install-project-dependencies-command')
  }

  async execute(options) {
    print('Installing dependencies...')
    const peerDependencies = [
      'typescript',
      'vue@2',
    ]
    const devDependencies = [
      '@types/node',
      'vite',
      'vite-plugin-vue2',
      'vue-tsc',
      'sass',
      'concurrently'
    ]
    await execute(`npm install --save-peer ${peerDependencies.join(' ')}`)
    await execute(`npm install --save-dev ${devDependencies.join(' ')}`)
    println('ok')

    return { projectDependenciesInitialized: true }
  }
}
