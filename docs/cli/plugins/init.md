# init

## 简介
init 插件，可以设置 Yarn 镜像源。安装 init 插件后会拷贝一份设置 Yarn 镜像源的代码，不需要手动写。

## 安装

使用 xy-plugin-init 首先需要安装 @xiyun/cli

```bash
yarn global add @xiyun/cli
```
再执行
```bash
xy add @xiyun/xy-plugin-init
```

## 示例

生成 .yarnrc 文件，并且设置 Yarn 镜像源：
```bash
$ xy init --yarn
```

生成 .editorconfig 文件
```bash
$ xy init --editor
```
