import { Action } from './Action.mjs'
import { print, println, withPackageJson, execute, copyFile } from '../utils.mjs'

export class InitTestsCommand extends Action {
  constructor() {
    super('init-tests-command')
  }

  async enabled(options) {
    return options.initTests
  }

  async execute(options) {
    print('Installing test dependencies...')
    const devDependencies = [
      '@vue/test-utils@1',
      'jsdom',
      'c8',
      'unplugin-vue2-script-setup',
      'vitest'
    ]
    await execute(`npm install --save-dev jest ${devDependencies.join(' ')}`)
    println('ok')

    print('Initializint test subsystem (Jest)...')
    await copyFile('vitest.config.js')
    await copyFile('vitest.setup.js')
    await withPackageJson(packageJson => {
      packageJson.scripts['test'] = 'vitest run --coverage'
      packageJson.scripts['test:watch'] = 'vitest --watch --coverage'
      packageJson.scripts['prepublishOnly'] = 'npm install && npm test && npm run build'
    })
    println('ok')

    return { testsInitialized: true }
  }
}
