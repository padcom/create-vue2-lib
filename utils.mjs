import chalk from 'chalk'
import { exec } from 'child_process'
import { writeFileSync, readFileSync } from 'fs'
import { fileURLToPath } from 'url'

export { mkdirSync as mkdir, writeFileSync as writeFile, readFileSync as readFile, readdirSync as readdir } from 'fs'

export function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, function(error, stdout, stderr) {
      if (error) reject(error)
      else resolve(stdout)
    })
  })
}

export async function setNpmRc(option, value) {
  return execute(`npm config set "${option}"="${value}" --userconfig .npmrc`)
}

export async function withPackageJson(callback) {
  let filename = './package.json'
  if (arguments.length === 2) {
    filename = arguments[0]
    callback = arguments[1]
  }
  const packageJson = JSON.parse(readFileSync(filename))
  await callback(packageJson)
  writeFileSync(filename, JSON.stringify(packageJson, null, 2))
}

export async function copyFile(filename, destination = filename) {
  writeFileSync(`./${destination}`, readFileSync(`${dirname}/templates/${filename}`))
}

export async function copyTemplate(filename, destination = filename, context = {}) {
  if (arguments.length === 2) {
    context = destination
    destination = filename
  }
  let content = readFileSync(`${dirname}/templates/${filename}`).toString()
  Object.entries(context).forEach(([ name, value ]) => {
    content = content.replaceAll(`@@${name}@@`, value)
  })
  writeFileSync(`./${destination}`, content)
}

export function print(msg) {
  process.stdout.write(chalk.magenta('> ') + chalk.gray(msg))
}

export function println(msg) {
  process.stdout.write(chalk.bold.green(msg + '\n'))
}

export function error(msg) {
  process.stdout.write(chalk.bold.red('ERROR') + '\n\n' + chalk.bold(msg) + '\n')
}

export const dirname = fileURLToPath(new URL('.', import.meta.url))

export function flushStdin() {
  for (let i = 0; i < 3; i++) while (process.stdin.read() !== null);
}
