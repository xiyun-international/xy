# 禧云业务工具

#### 说明
禧云业务工具是提供给业务使用的一些工具集，例如发起请求的 post 方法，获取和设置本地 token 的方法等。

#### 安装

```shell
$ yarn add @xiyun/utils
or
$ npm install @xiyun/utils
```

#### 使用

**xyPost 工具**，提供post数据请求，基于 axios 进行了封装

代码示例
```js
import {xyPost} from '@xiyun/utils';

xyPost.config();
xyPost.bizErrorHandler();
xyPost.catchErrorHandler();
xyPost.post();
```

xyPost 提供了四个接口，分别是：

| API | 说明 | 默认值 |
|---|---|---|
|config|用于配置 post 时的相关选项，详情请看下文|`{ headers: {},baseURL: '', timeout: 10000 }`|
|bizErrorHandler|用于设置请求过程中涉及到的业务级别的错误，详情请看下文 |空|
|catchErrorHandler|用于设置请求过程中发生错误和被reject后，需要自行处理的错误，详情请看下文 |空|
|post|执行请求的方法，详情请看下文 |空|

- config 方法

发请求前的配置项，在一般情况下，你只需要配置 baseURL 就可以了，如果你使用禧云的是 element-ui-template 
和 antd-ui-template，那么只需要设 `{baseURL: process.env.VUE_APP_API}` 就可以了。

我们默认设置这三个 header 选项：
```js
{
  Authorization: getToken(),
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}
```
更多的配置项可以参考[axios 的配置项](https://github.com/axios/axios#request-config)

- bizErrorHandler 方法

你需要在这个方法中传入一个回调函数，回调函数可以接收到接口返回的 response 作为参数，
可以根据业务对这个响应做相应的处理，如果有业务错误那么需要返回一个被 reject 掉的 Promise，
如果成功，需要把 response 原样返回。

示例：
```js
xyPost.bizErrorHandler(res => {
  if (res.data.status !== 10000) {
    message.error(res.data.message)
    return Promise.reject(res);
  }
  return res;
});
```

- catchErrorHandler

当一个请求发生错误，或被 reject 掉了，就会执行 catch 方法，你可以使用 catchErrorHandler 
来自定义处理 catch 的逻辑，默认我们会把错误抛出来。

示例：
```js
xyPost.catchErrorHandler(res => {
  console.log(res.data);
});
```

- post

执行 post 请求的方法，接收三个参数：api、args 和 selfHandleError。
api：是要请求的接口，注意如果你已经在 baseURL 配置过基础url，那么在这里，只需要填写对应的接口就可以了。
args：post 请求携带的参数，需要提供一个对象的形式。
selfHandleError：是否在调用的地方自行处理错误，默认 false，如果为 true，那么你需要在调用接口的地方使用 catch 来捕获错误。

示例：
```js
xyPost.post('/v1/get-user-detail', {uid: 123}).then(res => {
  console.log(res);
})
```
