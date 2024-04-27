
const minimist = require("minimist")
const prompts = require("prompts")
const path = require("node:path")
const fs = require('node:fs')
const { rimraf } = require("rimraf")
const { upperFirst } = require("lodash")

void (async function () {
  const { name: componentName } = minimist(process.argv.slice(2), { string: 'name' })
  
  if (componentName === undefined) throw Error('No Component Name!')
  
  const dirname = path.resolve(path.resolve(__dirname, '..'), 'src', componentName)

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
