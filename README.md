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

### The division of unit functions is somewhat vague and does not take into account the reuse of smaller units

# todo
> 先根据当前阶段的需求，逐渐补充组件库，等待内容补充完毕，再进行组件分类，进而完成packages层的组件


- 需要一个容器，控制内容的渐入渐出
- grid布局组件，提供内容添加

