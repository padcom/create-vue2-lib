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
      'jest',
      '@types/jest',
      'ts-jest',
      '@vue/test-utils@1',
      '@vue/vue2-jest',
      'jsdom',
      'jsdom-global',
    ]
    await execute(`npm install --save-dev jest ${devDependencies.join(' ')}`)
    println('ok')

    print('Initializint test subsystem (Jest)...')
    await copyFile('jest.config.js')
    await copyFile('jestSetup.js')
    await withPackageJson(packageJson => {
      packageJson.scripts['test'] = 'jest --coverage'
      packageJson.scripts['test:watch'] = 'jest --watch --coverage'
    })
    println('ok')

    return { testsInitialized: true }
  }
}
