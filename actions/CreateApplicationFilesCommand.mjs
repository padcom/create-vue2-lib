import { Action } from './Action.mjs'
import { print, println, copyFile, execute, mkdir, withPackageJson } from '../utils.mjs'

export class CreateApplicationFilesCommand extends Action {
  constructor() {
    super('create-application-files-command')
  }

  async execute(options) {
    print('Creating main.ts...')
    await mkdir('lib')
    await mkdir('lib/components')
    await copyFile('main.ts', 'lib/main.ts')
    await copyFile('App.vue', 'lib/App.vue')
    await copyFile('Hello.vue', 'lib/components/Hello.vue')
    await copyFile('index.ts')
    await copyFile('index.html')
    await copyFile('shims-vue.d.ts')
    await copyFile('vite.config.ts')
    withPackageJson(packageJson => {
      packageJson.main = `dist/${packageJson.name.split('/').at(-1)}.umd.js`
      packageJson.files = [ 'dist' ]
      if (options.gitRepoInitialized) {
        const [ , , user, host ] = /(.+) \<(.+)\@(.+)>/.exec(packageJson.author)
        packageJson.repository = {
          type: 'git',
          url: `http://github.com/${user}/${packageJson.name}`,
        }
        packageJson.bugs = {
          email: `${user}@${host}`,
          url: `http://github.com/${user}/${packageJson.name}`,
        }
      }
    })
    println('ok')

    return { applicationFilesInitialized: true }
  }
}
