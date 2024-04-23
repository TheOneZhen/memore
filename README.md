# Why `Turborepo`

I don't know, NB maybe.

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
### 支持用户登录Git（流程）

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

### 内容更新（流程）

### 冲突管理（流程）

### .memore-cache内容

1. 用户基本设置`.user.config.json`
    1. 当本地配置与远程配置不同时，提示用户。
2. 目录信息`.content.config.json`
    1. 用户在某个设备使用Git登录，但是无法获取Git Platforms上的用户信息和仓库列表以及仓库信息（！Git账户和Git Platforms是分离的），所以还需要用户提供`Git Platforms User Profile`地址（比如GitHub平台：https://github.com/TheOneZhen/memore.git）。然后将用户提供的信息保存到本地`.git.record`，根据用户提供的`Git Platforms User Profile`地址拼接得到.memore-cache地址，并进行clone
    2. 读取`.memore-cache`中`.content.config.json`，并逐一clone目录
3. 日志信息`.user.log.json`

### markdown内容解析

根据marked分类，tokens包含以下内容
块级内容：
空格（space）、代码（Code）、表格（table）、表格单元（table-cell）、换行符（hr）、引用（block quote，`>`）、列表（list）、列表项（list-item）、段落（paragraph）、HTML、文本（text）、定义（def）、escape、标签（tag）、链接（link）、图片（image）
行内内容：
加粗（Strong）、斜体（Em）、行内代码（Codespan）、下划线（Br）、删除线（del）。

对于markdown支持的语义，现阶段都会转换为对应的组件，然后分开处理（方便自动化测试）

1. 扩展marked.lexer，包括规则，状态转换
2. 将外部工具也引入测试内容中，如果外围工具用例出错，则去外围工具中bugfix。
3. 最后的内容一定要转换为组件。因为现阶段还是以组件渲染为主

用户键入标识字符（#、<、`等字符）后，开启对应模式，已实现内容的显示


## 核心模块
<!-- 在不同设备上，保持用户仅使用一件外设（鼠标、键盘、绘图笔等）即可完成文档工具的切换 -->
1. 支持markdown解析
2. 支持mermaid语法
    1. 支持context，拆分变量，可以在多个模块中使用
3. 支持思维导图及各类图表
4. 支持绘图