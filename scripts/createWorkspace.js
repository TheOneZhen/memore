const fs = require('node:fs')
const path = require('node:path')
const minimist = require('minimist')
const prompts = require('prompts')
const { rimraf } = require('rimraf')

/**
 * create a workspace
 */
void (async function () {
  const { name: workspaceName } = minimist(process.argv.slice(2), {
    string: 'name',
  })

  if (workspaceName === undefined) {
    console.error('No name!')
    return
  }
  const root = path.resolve(__dirname, '..')
  const dirname = path.resolve(root, workspaceName)

  if (fs.existsSync(dirname)) {
    const { value } = await prompts([
      {
        type: 'select',
        name: 'value',
        message: 'The directory already exists. Do you want to delete it?',
        choices: [
          { title: 'Yes', value: true },
          { title: 'No', value: true },
        ],
      },
    ])

    if (value === false) return

    await rimraf(dirname)
  }
  // create directory
  fs.mkdirSync(dirname)
  // update pnpm-workspace.yaml
  fs.appendFileSync(
    path.resolve(root, 'pnpm-workspace.yaml'),
    `  - "${workspaceName}/*"\n`,
  )
})()
