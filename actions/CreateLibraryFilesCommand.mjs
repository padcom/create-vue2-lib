import { Action } from './Action.mjs'
import { print, println, copyFile, copyTemplate, mkdir, withPackageJson } from '../utils.mjs'

export class CreateLibraryFilesCommand extends Action {
  constructor() {
    super('create-library-files-command')
  }

  async execute(options) {
    print('Creating library files...')
    await mkdir('lib')
    await copyFile('vite.config.js')
    await copyFile('vitest.config.js')
    await copyFile('vitest.setup.js')
    await copyFile('index.js', 'lib/index.js')
    await mkdir('lib/components')
    await copyFile('Example.vue', 'lib/components/Example.vue')
    await withPackageJson(packageJson => {
      const name = packageJson.name.split('/').at(-1)
      packageJson.main = `dist/${name}.umd.js`
      packageJson.module = `dist/${name}.es.js`
      packageJson.exports = {
        '.': {
          require: `dist/${name}.umd.js`,
          import: `dist/${name}.es.js`,
        }
      }
      packageJson.files = [ 'dist' ]
      if (options.gitRepoInitialized && packageJson.author) {
        const [ , , user, host ] = /(.+) \<(.+)\@(.+)>/.exec(packageJson.author)
        if (user && host) {
          packageJson.repository = {
            type: 'git',
            url: `http://github.com/${user}/${packageJson.name}`,
          }
          packageJson.bugs = {
            email: `${user}@${host}`,
            url: `http://github.com/${user}/${packageJson.name}`,
          }
        }
      }
    })

    println('ok')

    return { libraryFilesInitialized: true }
  }
}
