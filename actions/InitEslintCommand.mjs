import { Action } from './Action.mjs'
import { print, println, execute, copyFile, withPackageJson } from '../utils.mjs'

export class InitEslintCommand extends Action {
  constructor() {
    super('run-tests-command')
  }

  async enabled(options) {
    return options.initEslint
  }

  async execute(options) {
    print('Installing eslint dependencies...')
    await execute('npm install --save-dev eslint eslint-plugin-vue vite-plugin-eslint')
    println('ok')

    print('Initializing eslint...')
    await copyFile('.eslintrc.js')
    await copyFile('vite.config.js-with_eslint', 'vite.config.js')
    println('ok')

    return { eslintInitialized: true }
  }
}
