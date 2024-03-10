# memore
Memore is a multi-platform memo App, and build sharing around GitHub.

# 技术调研

如果要使用GitHub作为仓库，那需要git来管理代码。
目前来看应该不存在技术壁垒

1. 用户使用momore登录GitHub
   1. 如果用户是第一次登录，会为其创建一个空白仓库（private，momore-cache）
   2. 如果用户不是第一次登录（存在momore-cache），则读取仓库数据，拉取数据到本地。
2. 仓库最外层数据（每个目录）是记录在momore-cache中的。每一栏目录都是一个独立的仓库，这个仓库可以用来展示和共享数据。