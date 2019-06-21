
### http 请求工具

我们根据业务基于 axios 封装了 http 请求方法，目的是为了避免再去封装它。

目前封装了 post 请求和 get 请求，你只需要做一些业务级的逻辑判断，就可以快速的使用。

http 工具提供了五个接口，分别是：

| API | 说明 | 默认值 |
|---|---|---|
|config|用于配置发请求时的相关选项，如头部信息、请求地址等|`{ headers: {},baseURL: '', timeout: 10000, isUseQs: true }`|
|bizErrorHandler|用于自定义设置请求过程中涉及到的业务级别的错误 |不提供|
|catchErrorHandler|用于自定义设置请求过程中发生错误和被reject后，需要自行处理的错误等|不提供|
|post|执行请求的方法，详情请看下文 ||
|get|执行请求的方法，详情请看下文 ||

### 详细参数

#### config 方法
发请求前的配置项，可以对请求的行为进行一些自定义配置。在一般情况下，你只需要配置 baseURL 就可以了。

其中有一个配置项：`isUseQs`，用在 post 请求中是否需要 `qs.stringify`来格式化请求参数，格式化以后，Content-Type 就需要设置为 form-urlencoded，我们默认使用了它。

你可以自定义配置 qs 选项：
```js
http.config({
  qs: {
    // 你的配置
  }
})
```

header 默认配置选项：
```js
{
  // getToken() 是从localStorage 中获取 TOKEN 为 key 的值
  Authorization: getToken(),
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
}
```
自定义 header 配置项：
```
http.config({
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
})
```

更多的配置项可以参考 [axios 的配置项](https://github.com/axios/axios#request-config)

#### bizErrorHandler 业务错误处理函数

你需要在这个方法中传入一个回调函数，回调函数可以接收到接口返回的 response 作为参数，
可以根据业务对这个响应做相应的处理，如果有业务错误那么需要返回一个被 reject 掉的 Promise，
如果成功，需要把 response 原样返回。

示例：
```js
post.bizErrorHandler(res => {
  if (res.code !== 200) {
    message.error(res.message)
    return Promise.reject(res);
  }
  return res;
});
```

#### catchErrorHandler 公共错误处理函数

当一个请求发生错误，比如：401、404、500 等，或被 reject 掉了，就会执行 catch 方法，你可以使用 catchErrorHandler 
来自定义处理 catch 的逻辑，默认我们会把错误抛出来，你可以在 `.catch`方法中进行接收，如果你想对错误请求进行统一处理，
那么这个处理函数就派上用场了。

示例：
```js
post.catchErrorHandler(res => {
  message.error(res.message)
});
```

#### 发起请求

执行 post 或 get 请求的方法，接收三个参数：api、args 和 selfHandleError。
- api：是要请求的接口，注意如果你已经在 baseURL 配置过基础url，那么在这里，只需要填写对应的接口就可以了。
- args：请求携带的参数，需要提供一个对象的形式。
- selfHandleError：是否在调用的地方自行处理错误，默认 false，统一由 catchErrorHandler 处理错误；
如果为 true，那么你需要在调用接口的地方使用 catch 来捕获错误。

使用示例：
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

#### 在项目中的封装示例

假设在 utils 目录中，创建一个`http.js`文件。

```js
import { http, removeToken } from '@xiyun/utils';
import { message } from 'ant-design-vue';
import Router from '@/router/index';

const apiUrl = process.env.VUE_APP_API;

message.config({
  maxCount: 1
});

http.config({
  baseURL: apiUrl,
});

http.bizErrorHandler(res => {
  const { code, msg } = res;
  switch (code) {
    // 成功
    case 200:
      return res;
    case 401:
      message.error('登录过期，请重新登录');
      removeToken();
      Router.replace('/login');
      return Promise.reject(JSON.stringify({ code, msg }));
    default:
      message.error(msg);
      return Promise.reject(JSON.stringify({ code, msg }));
  }
});

// http.catchErrorHandler(res => {
//   message({
//     type: 'error',
//     message: res,
//   })
// });

function post(api, params = {}, selfHandleError = false) {
  return http.post(api, params, selfHandleError);
}

function get(api, params = {}, selfHandleError = false) {
  return http.get(api, params, selfHandleError);
}

export { post, get };

```
