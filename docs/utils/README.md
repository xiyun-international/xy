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
