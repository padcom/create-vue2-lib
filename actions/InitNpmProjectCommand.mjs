import { Action } from './Action.mjs'
import { print, println, execute, withPackageJson, setNpmRc } from '../utils.mjs'

export class InitNpmProjectCommand extends Action {
  constructor() {
    super('init-npm-project-command')
  }

  async execute(options) {
    print('Initializing project...')
    await execute('npm init -y')
    await setNpmRc('engine-strict', true)
    const nodeVersion = await execute('node --version')
    const npmVersion = await execute('npm --version')
    await withPackageJson(packageJson => {
      packageJson.engines = {
        node: `>=${nodeVersion.trim()}`,
        npm: `>=${npmVersion.trim()}`,
      }
      packageJson.main = packageJson.name.split('/').at(-1)
    })
    println('ok')

    return { npmProjectInitialized: true }
  }
}
