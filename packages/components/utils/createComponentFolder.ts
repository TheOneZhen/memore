import minimist from 'minimist'
import path from 'node:path'
import fs from 'node:fs'
import prompts from 'prompts'
import { rimraf } from 'rimraf'
import { upperFirst } from 'lodash-es'

void (async function () {
  const { name: componentName } = minimist<{
    name?: string
  }>(process.argv.slice(2), { string: 'name' })
  
  if (componentName === undefined) throw Error('No Component Name!')
  
  const dirname = path.resolve(__dirname, componentName)

  if (fs.existsSync(dirname)) {
    const { value } = await prompts([
      {
        type: 'select',
        name: 'value',
        message: 'The component already exists. Do you want to delete it?',
        choices: [
          { title: 'Yes', value: true },
          { title: 'No', value: false },
        ],
        initial: 1,
      },
    ])

    if (value === false) return
    await rimraf(dirname)
  }

  fs.mkdirSync(dirname)
  fs.mkdirSync(path.resolve(dirname, '__tests__'))
  fs.mkdirSync(path.resolve(dirname, 'style'))
  fs.writeFileSync(path.resolve(dirname, 'index.ts'), '')
  fs.writeFileSync(
    path.resolve(dirname, `${upperFirst(componentName)}.tsx`),
    '',
  )
  console.log(`Ok!`)
})()
