# generator

## 简介

generator 插件，是针对业务的通用表单生成工具。安装 generator 插件后可以生成一套通用的 template 模板，无需手动从零开始排版。

## 安装
使用 xy-plugin-generator 首先需要安装 @xiyun/cli

```shell
yarn global add @xiyun/cli
```
再执行
```shell
xy add @xiyun/xy-plugin-generator
```

## 示例
下载指定 template 模板：
```shell
$ xy generator pageName
```
下载所有 template 模板：
```shell
$ xy generator pageName --scaffold
```

