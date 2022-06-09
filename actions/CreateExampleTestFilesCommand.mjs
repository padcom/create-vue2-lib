import { Action } from './Action.mjs'
import { print, println, copyFile } from '../utils.mjs'

export class CreateExampleTestFilesCommand extends Action {
  constructor() {
    super('init-tests-command')
  }

  async enabled(options) {
    return options.initTests && options.createExampleTest
  }

  async execute(options) {
    print('Creating example test...')
    await copyFile('example.test.ts', 'lib/example.test.ts')
    await copyFile('Hello.test.ts', 'lib/components/Hello.test.ts')
    println('ok')

    return { exampleTestsCreated: true }
  }
}
