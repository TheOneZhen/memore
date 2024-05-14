# Why `Turborepo`

I don't know, NB maybe.

# command

- add local dependency: `pnpm add packageName@version --filter=workspace --workspace`
- list all workspaces in JSON format: `pnpm m ls --depth -1 --json`

# Architecture

## apps

Its role to combine the functionalities from various packages and package them into installers for different platforrms. Packages based on Node.js engines for apps that provide functionality to request user accounts from GitHub.

## packages

UI and some utils like markdown parser, cahcing.

By refining the grranularity of packages, we can maximize support for Turbo performance.

## this

- Users use one external device to edit content on different platforms.
- What you see is what you get.

## function list

## Unit(components & utils) Rules

### Unit does not handle any upper-level business internally

### component behavior

## disadvantages

## 最底层业务（unit）划分很模糊

# flows & config

## 支持用户登录Git（流程）

1. **登录检测**。用户打开memore，检测本地是否存在`.git.record.json`：
    1. 如果存在，执行**Git状态检测**。
    2. 如果不存在，提示用户进行登录：
        1. 如果用户拒绝登录，可以正常使用memore本地功能：
        2. 如果选择不再提醒，仅进行协同服务操作时才会提醒；
        3. 如果没有选择不再提醒，下次启动前如果不使用协同服务则不再提醒，下次启动则会继续提醒。
    3. 用户输入Git相关信息和`Git Platforms User Profile`之后，将信息保存到`.git.record.json`中，执行**Git状态检测**。
2. **Git状态检测**。当本地存在`.git.record.json`文件时，检测Git合法性：
    1. 检测`Git Platforms User Profile`下是否存在`.memore-cache`：
        1. 如果存在，执行`仓库内容检测`。
        2. 如果不存在：
            1. 尝试创建`.memore-cache`：
            2. 如果无法创建，抛出同名错误；
            3. 如果可以创建，创建`.memore-cache`
                <!-- 新的问题，如果在本地创建仓库并推送到Git Platforms。要求不需要用户任何编码性质操作。
                    1. 用户提供Git Platforms create repo API，然后根据此API创建repo。
                    2. 收集各个Git Platforms create repo API，然后做映射。
                    3. 仅支持Github用户登录，然后只针对GithubAPI。
                -->
    2. 拉取`.memore-cache`，获取各个目录信息，执行**内容更新检测**
3. **内容更新检测**。
    <!-- 所有内容不会自动更新（同vscode），只有用户手动更新的时候才会进行 -->

## 内容更新（流程）

## 冲突管理（流程）

## .memore-cache内容（config）

1. 用户基本设置`.user.config.json`
    1. 当本地配置与远程配置不同时，提示用户。
2. 目录信息`.content.config.json`
    1. 用户在某个设备使用Git登录，但是无法获取Git Platforms上的用户信息和仓库列表以及仓库信息（！Git账户和Git Platforms是分离的），所以还需要用户提供`Git Platforms User Profile`地址（比如GitHub平台：https://github.com/TheOneZhen/memore.git）。然后将用户提供的信息保存到本地`.git.record`，根据用户提供的`Git Platforms User Profile`地址拼接得到.memore-cache地址，并进行clone
    2. 读取`.memore-cache`中`.content.config.json`，并逐一clone目录
3. 日志信息`.user.log.json`