# 简介
我们为业务开发，提供了一系列的工具；你可以在某些业务场景中使用它们，会帮你提升开发效率；这些工具如提供了身份证、手机号、邮箱的敏感信息加密；PostMessage API 的封装、基于 axios 对业务级的二次封装等。

## 安装

```shell
$ yarn add @xiyun/utils
```

## 使用
这里以**post 方法**为例，post 基于 axios 封装了 post 数据请求方法。

代码示例
```js
import { post } from '@xiyun/utils';

// 配置
post.config({});
// 业务级别的错误处理
post.bizErrorHandler((res) => {});
// 最终的错误处理方法
post.catchErrorHandler((err) => {});

// 发起请求
post('api', params).then(res => {});
```

详情请参考各 API 文档。
