import { Action } from './Action.mjs'
import { print, println, withPackageJson } from '../utils.mjs'

export class InitScriptsCommand extends Action {
  constructor() {
    super('init-scripts-command')
  }

  async execute(options) {
    print('Adding start and build scripts...')
    await withPackageJson(packageJson => {
      packageJson.version = '0.0.0'
      packageJson.main = 'start.ts'
      packageJson.scripts['start'] = `npm run build -- --mode=development && concurrently 'npm run build:watch' 'npm --prefix example start'`
      packageJson.scripts['clean'] = 'rimraf coverage dist && npm --prefix example run clean'
      packageJson.scripts['build'] = 'vite build'
      packageJson.scripts['build:watch'] = 'vite build -w --mode=development'
      packageJson.scripts['prepublishOnly'] = 'npm install && npm run build'
      packageJson.scripts['postinstall'] = 'npm --prefix example install'
    })
    println('ok')

    return { scriptsInitialized: true }
  }
}
