# 简介
我们为业务开发，提供了一系列的工具；你可以在某些业务场景中使用它们，会帮你提升开发效率；这些工具如提供了身份证、手机号、邮箱的敏感信息加密；PostMessage API 的封装、基于 axios 对业务级的二次封装等。

## 安装

```bash
$ yarn add @xiyun/utils
```

## 使用
这里以**http 方法**为例，http 工具基于 axios 封装了 post 和 get 数据请求方法。

代码示例
```js
import { http } from '@xiyun/utils';

http.config({
  baseURL: "https://www.easy-mock.com/mock/5cec94be4ab28d196665a9c3/example"
});
http.bizErrorHandler(res => {
  // 自行处理业务错误逻辑
  if (res.success !== true) {
    return Promise.reject(res);
  } else {
    return res;
  }
});
// 第二个参数代表发请求时设置的是否是自己处理错误，
// 因为你可能会在错误处理中配置错误消息展示之类的逻辑，如果某个地方不需要这种功能，就可以交由该请求自行处理
http.catchErrorHandler((err, selfHandleError) => {
  // 如果
  if (selfHandleError) {
    return Promise.reject(err);
  } else {
    console.log(selfHandleError);
    console.log(err);
    console.log(err.name, err.message);
    console.log(err.response);
    throw new Error(err.message);
    // 或
    // return Promise.reject(err);
  }
});
// get 请求
http.get("/mock", {}).then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
// post 请求
http.post("/mock_post", {}).then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
// post 请求，并自行处理错误逻辑
http.post("/mock_post", {}, true).then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
```

详情请参考各 API 文档。
