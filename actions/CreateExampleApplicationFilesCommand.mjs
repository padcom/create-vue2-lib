import { Action } from './Action.mjs'
import { print, println, copyFile, copyTemplate, mkdir, withPackageJson } from '../utils.mjs'

export class CreateExampleApplicationFilesCommand extends Action {
  constructor() {
    super('create-example-application-files-command')
  }

  async execute(options) {
    print('Creating example application files...')

    await mkdir('example')
    await mkdir('example/src')
    await withPackageJson(async (library) => {
      const name = library.name.split('/').at(-1)
      await copyTemplate('example-package.json', 'example/package.json', { name })
      await withPackageJson('example/package.json', async (example) => {
        await copyTemplate('App.vue', 'example/src/App.vue', { name })
      })
    })
    await copyFile('main.js', 'example/src/main.js')
    await copyFile('index.html', 'example/index.html')
    await copyFile('example-vite.config.js', 'example/vite.config.js')

    println('ok')

    return { exampleApplicationFilesInitialized: true }
  }
}
