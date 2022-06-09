import { Action } from './Action.mjs'
import chalk from 'chalk'

export class SummaryCommand extends Action {
  constructor() {
    super('summary-command')
  }

  async execute(options) {
    console.log('\nAll done! You can start your project like that:\n')
    console.log(chalk.green('$'), chalk.white('npm start\n'))
    console.log('or you can just use the executable start.ts:\n')
    console.log(chalk.green('$'), chalk.white('./start.ts\n'))
    if (options.initTests) {
      console.log('You can test your project like that:\n')
      console.log(chalk.green('$'), chalk.white('npm test\n'))
      console.log('or you can run them continuously:\n')
      console.log(chalk.green('$'), chalk.white('npm run test:watch\n'))
    }
    if (options.initEslint) {
      console.log('You can lint your project like that:\n')
      console.log(chalk.green('$'), chalk.white('npm run lint\n'))
      console.log('or you can try fixing all the linter problems automatically:\n')
      console.log(chalk.green('$'), chalk.white('npm run lint:fix\n'))
    }

    return { summaryDisplayed: true }
  }
}
