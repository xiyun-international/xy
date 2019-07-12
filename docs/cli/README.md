# 简介
@xiyun/cli 是禧云提供的脚手架工具，类似于 Vue-CLI；通过内置命令即可创建出来符合禧云 UI 规范的项目，避免了改造样式、手动搭建和配置环境的步骤。后续它会提供多项命令，如与 ISV 共享业务的代码等，是禧云生态的核心工具。

## 安装
```bash
$ yarn global add @xiyun/cli
```

## 配置
Windows 环境需要配置 Yarn 的 **环境变量**，MacOS 系统不需要配置。  

## 初始化
```bash
$ xy create 项目名称
```

**创建项目的过程中，选择你需要用到的 UI 库：**  
- 从开放平台创建的应用需要选择 element-ui-template 模板
- 需要对接蚂蚁金服的项目，需要选择 ant-design-ui-template 模板
![](./pics/create.png)

**接下来，选择布局样式：**
- 以应用的方式，迁入到商家中心的应用；需要选择 Simple layout 模板
- 如果是独立的项目，有自己的头部和菜单，则需要选择 Full layout 模板
![](./pics/create2.png)

**Full layout 页面布局包含头部和左侧以及脚部等公用部分，页面如下图所示：**
![Full layout布局](./pics/full.png)

**Simple layout 页面布局不包含头部和左侧以及脚部等公用部分，适用于应用开发，页面如下图所示：**
![Simple layout布局](./pics/simple.png)

## 目录介绍
```
├── dist              # 打包后的文件目录
├── node_modules      # 第三方依赖包
├── public            # 公共文件，主要存储样式、字体、图片等
├── src               # 项目源码
│   ├── assets        # 公用样式、和静态资源，如 json 格式的文件
│   ├── components    # 组件目录
│   ├── config        # 配置文件目录，如导航菜单
│   ├── router        # 路由配置目录
│   ├── store         # vuex 的 store 目录
│   │   └── modules   # store 的 modules 目录
│   ├── utils         # 工具函数目录
│   └── views         # 项目页面目录
```

## 开始开发
```shell
# 启动项目
$ yarn start

# 打包项目
$ yarn build

# 代码格式检查
$ yarn lint
```
