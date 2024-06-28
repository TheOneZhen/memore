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

## Platform & Solutions

Memore rendering is dominated by SSR, 

- PC(Win, Linux, OS X): Electron as a container, Nuxt.js improves contents.
- Browser: 提供一个服务端用于数据解析，但是不提供存储服务。内容存储由浏览器完成。
- Small Programs(WeChat, DingTalk...)：提供一个服务端并挂载到小程序平台（依据服务大小与自动化相关问题最后再既定服务挂载位置），但是不提供存储服务。内容存储由小程序依赖提供的API。
- Mobile(Android, IOS, IpadOS...)
- Plugin(Browser, Vscode, WebStorm)

## Component communication mode

Event Bus

## SPA or SSR?

Use SPA development first, then consider whether to migrate SSR.

## function list

## Unit(components & utils) Rules

### Unit does not handle any upper-level business internally

### component behavior

## disadvantages

### The division of unit functions is somewhat vague and does not take into account the reuse of smaller units

# this

- Users use one external device to edit content on different platforms.
- What you see is what you get.

