import { Action } from './Action.mjs'
import { print, println, execute, withPackageJson } from '../utils.mjs'

export class MountLibraryInExampleProjectCommand extends Action {
  constructor() {
    super('mount-library-in-example-project-command')
  }

  async execute(options) {
    print('Mounting library in test project...')
    await withPackageJson(async (library) => {
      const name = library.name.split('/').at(-1)
      await withPackageJson('example/package.json', example => {
        example.dependencies = example.dependencies || {}
        example.dependencies[library.name] = 'file:..'
      })
    })
    await execute('npm install')
    println('ok')

    return { libraryMountedInExampleApplication: true }
  }
}
