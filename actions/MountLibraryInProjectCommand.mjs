import { Action } from './Action.mjs'
import { print, println, copyFile, execute, mkdir, withPackageJson } from '../utils.mjs'

export class MountLibraryInProjectCommand extends Action {
  constructor() {
    super('create-application-files-command')
  }

  async execute(options) {
    print('Mounting library in test project...')
    await withPackageJson(packageJson => {
      packageJson.devDependencies[packageJson.name.split('/').at(-1)] = 'file:.'
    })
    await execute('npm install')
    println('ok')

    return { applicationFilesInitialized: true }
  }
}
