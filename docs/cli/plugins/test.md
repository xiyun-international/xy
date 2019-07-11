# test

## 简介
test 插件是针对于业务级（.vue）项目的测试工具。安装 test 插件后，目标项目不需要安装 jest、配置    babel。此插件可选，未集成到 Cli 中。

## 安装
如果想使用 xy-plugin-test 插件，首先需要安装 @vue/cli

```shell
yarn add @xiyun/cli
```
再执行
```shell
yarn add @xiyun/xy-plugin-test
```

## 示例
命令如下：
```shell
xy test <regexForTestFiles> <--options>
```
运行所有测试(默认):
```shell
xy test
```
仅运行符合指定用模板或文件名的测试︰
```shell
xy test example.test.js
```
运行监视模式︰
```shell
xy test --watch
```

## 更多选项

更多选项可以参考 <a href="https://jestjs.io/docs/zh-Hans/cli" target="_blank">https://jestjs.io/docs/zh-Hans/cli</a>
