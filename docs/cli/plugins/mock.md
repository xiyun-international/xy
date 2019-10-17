# mock

## 简介
mock 插件是为项目提供 mock 数据的工具。此插件可选，未集成到 Cli 中。

## 安装
如果想使用 xy-plugin-mock 插件，首先需要安装 @vue/cli

```shell
yarn add @xiyun/cli
```
再执行
```shell
yarn add @xiyun/xy-plugin-mock
```

## 示例
命令如下：
```shell
xy mock <--options>
```
扫描所有 mock 数据文件(默认):
```shell
xy mock
```
仅扫描符合指定用模板或文件名的 mock 数据文件︰
```shell
xy mock --path="**/__mock__/a.js"
```
运行监听模式，mock 文件变化无需重新执行 xy mock 命令︰
```shell
xy mock --watch
```
