# generator

## 简介
generator 插件，是针对业务的通用表单生成工具。安装 generator 插件后可以生成一套通用的 template 模板。
分为 antd 模板跟 element 模板，无需手动从零开始排版。且会默认下载 antd 模板。

## 安装

使用 xy-plugin-generator 首先需要安装 @xiyun/cli

```bash
yarn global add @xiyun/cli
```
再执行
```bash
xy add @xiyun/xy-plugin-generator
```

## 示例

下载指定 template 模板（默认下载 antd 模板）：
```bash
$ xy generator pageName
```
下载指定 ele 模板：
```bash
$ xy generator pageName --ele
```
下载所有 template 模板（默认下载 antd 模板）：
```bash
$ xy generator pageName --scaffold
```
下载所有 ele 模板：
```
$ xy generator pageName --ele --scaffold

