const minimist = require('minimist')
const fs = require('node:fs')
const path = require('node:path')
const prompts = require('prompts')
/**
 * The purpose of this script is to add internal dependencies to the application.
 * arguments:
 *  - `--filter`: 同pnpm的`--filter`,alies `-F`
 *  - `--workspace-root`: 同pnpm的`workspace-root`, alies `-w`
 *
 * if command lacks some arg change selection mode.
 */
/**
 * 在app下安装版本为version的packageName：
 * `npm run installSelf packageName@version --filter=app`
 * 在根目录下安装版本为version的packageName：
 * `npm run installSelf packageName@version -w`
 */

const root = path.resolve(__dirname, '..')

function getWorkspaces() {
  const worksapces = []
  const yaml = fs.readFileSync(
    path.resolve(root, 'pnpm-workspace.yaml'),
    'utf-8',
  )

  for (const item of yaml.matchAll(/-\s"(.*)"/g))
    if (item && item[1]) worksapces.push(item[1].replace(/\/.*/g, ''))

  return worksapces
}

void async function () {
  const {
    _: [target],
    filter,
    F,
    w,
    'workspace-root': workspaceRoot,
  } = minimist(process.argv.slice(2))
  const worksapces = getWorkspaces()

  if (worksapces.length === 0) {
    console.warn('No workspaces!')
    return
  }

  if (target === undefined) {
    // 进入选择包模式
    console.error('No package name!')
    return
  }

  if (!(filter || F || w || workspaceRoot)) {
    console.error('please infer target directory.') // 这里可以切换选择模式
    return
  }
}

async function selection() {
  // 选择需要添加的依赖包
  const root = path.resolve(__dirname, '..')
  const yaml = fs.readFileSync(
    path.resolve(root, 'pnpm-workspace.yaml'),
    'utf-8',
  )
  const workspaceNames = []

  for (const item of yaml.matchAll(/-\s"(.*)"/g)) {
    if (item && item[1]) workspaceNames.push(item[1].replace(/\/.*/g, ''))
  }

  if (workspaceNames.length === 0) {
    console.error('No workspaces!')
    return
  }

  const { workspace } = await prompts([
    {
      type: 'select',
      name: 'workspace',
      message: 'Please select workspace:',
      choices: workspaceNames.map(item => ({
        title: item,
        value: item,
      })),
    },
  ])

  const directories = await fs.readdirSync(path.resolve(root, workspace), {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  const { dependence } = await prompts([
    {
      type: 'select',
      name: 'dependence',
      message: 'Please select dependence:',
      choices: '',
    },
  ])

  // 选择需要添加依赖的项目
  // 判断是否同源
}
