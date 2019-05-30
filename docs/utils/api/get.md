
### get 

get 工具，是基于 axios 封装了一层 `HTTP GET` 数据请求方法，你只需要做一些业务级的状态码判断，就可以快速的使用。

get 工具提供了四个接口，分别是：

| API | 说明 | 默认值 |
|---|---|---|
|config|用于配置 post 时的相关选项，如头部信息、请求地址等等|`{ headers: {},baseURL: '', timeout: 10000 }`|
|bizErrorHandler|用于设置请求过程中涉及到的业务级别的错误 |空|
|catchErrorHandler|用于设置请求过程中发生错误和被reject后，需要自行处理的错误|空|
|get|执行请求的方法，详情请看下文 |空|

### 详细参数

#### config 方法
发请求前的配置项，在一般情况下，get 请求无需配置，更多配置项可以参考 [axios 的配置项](https://github.com/axios/axios#request-config)

#### bizErrorHandler 方法

你需要在这个方法中传入一个回调函数，回调函数可以接收到接口返回的 response 作为参数，
可以根据业务对这个响应做相应的处理，如果有业务错误那么需要返回一个被 reject 掉的 Promise，
如果成功，需要把 response 原样返回。

示例：
```js
get.bizErrorHandler(res => {
  if (res.data.status !== 10000) {
    message.error(res.data.message)
    return Promise.reject(res);
  }
  return res;
});
```

#### catchErrorHandler

当一个请求发生错误，或被 reject 掉了，就会执行 catch 方法，你可以使用 catchErrorHandler 
来自定义处理 catch 的逻辑，默认我们会把错误抛出来。

示例：
```js
get.catchErrorHandler(res => {
  console.log(res.data);
});
```

#### 发起 get 请求

执行 get 请求的方法，接收三个参数：api、params 和 selfHandleError。
- api：是要请求的接口，注意如果你已经在 baseURL 配置过基础url，那么在这里，只需要填写对应的接口就可以了。
- params：get 请求附带在 url 后的参数，需要提供一个对象的形式。
- selfHandleError：是否在调用的地方自行处理错误，默认 false，统一处理错误；如果为 true，那么你需要在调用接口的地方使用 catch 来捕获错误。

示例：
```js
import { get } from '@xiyun/utils'

get.bizErrorHandler(res => {
  if (res.data.status !== 10000) {
    message.error(res.data.message);
    return Promise.reject(res);
  }
  return res;
});

get('/v1/get-user-detail', {uid: 123}).then(res => {
  console.log(res);
})
```
