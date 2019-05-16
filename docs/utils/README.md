# 简介
我们为业务开发了一系列工具集，你可以在需要的时候使用它们，会提升很多效率，如：敏感信息加密，PostMessage API 的封装等等。

## 安装

```shell
$ yarn add @xiyun/utils
```

## 使用
这里以**post 方法**为例，post 基于 axios 封装了 post 数据请求方法。

代码示例
```js
import { post as postUtils } from '@xiyun/utils';

// 配置
postUtils.config({});
// 业务级别的错误处理
postUtils.bizErrorHandler(() => {});
// 最终的错误处理方法
postUtils.catchErrorHandler(() => {});

// 在组件中，发起请求
postUtils.post('api', params).then(res => {});
```

其它案例参考 API。
