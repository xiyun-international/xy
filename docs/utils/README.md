
# 简介

我们为业务开发了一系列工具集，你可以在需要的时候使用它们，会提升很多效率，如：敏感信息加密，PostMessage API 的封装等等。

## 安装

```shell
$ yarn add @xiyun/utils
```

## 使用

这里以**xyPost 方法**为例，xyPost 基于 axios 封装了 post 数据请求方法。

代码示例
```js
import {xyPost} from '@xiyun/utils';

// 配置
xyPost.config({});
// 业务级别的错误处理
xyPost.bizErrorHandler(() => {});
// 最终的错误处理方法
xyPost.catchErrorHandler(() => {});
// 发起请求
xyPost.post('api', params).then(res => {});
```

更详细的文档请参阅各方法文档。

## 参与开发

1、克隆禧云生态代码
```shell
$ git clone https://github.com/xiyun-international/xy.git
$ cd xy
```
2、进行文件监听
```shell
$ yarn utils:watch
```
3、开发测试（以创建应用为例）
```shell
$ node ./package/cli/bin/xy.js create my-app
```
4、开发完成，执行编译
```shell
$ yarn utils:build
```
5、执行发布（如果你是以PR的方式贡献代码，那么这一步将由我们来执行）
```shell
$ lerna publish
```
