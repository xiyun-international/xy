import http from "../lib/libraries/http";
import post from "../lib/post";

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
    // return Promise.reject(err);
  }
});
// get 请求
// http.get("/mock", {}).then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });
// post 请求
// http.post("/mock_post", {}).then(res => {
//     // console.log(res);
//     localStorage.setItem("TOKEN", "234234234");
//     http.post("/mock_post", {}).then(r => {});
//   })
//   .catch(err => {
//     console.log(err);
//   });
// post.config({
//   baseURL: "https://www.easy-mock.com/mock/5cec94be4ab28d196665a9c3/example"
// });
post("/mock_post", {}).then(res => {
    // console.log(res);
    localStorage.setItem("TOKEN", "234234234");
    post("/mock_post", {}).then(r => {});
  })
  .catch(err => {
    console.log(err);
  });
// post 请求，并自行处理错误逻辑
// http.post("/mock_post", {}, true).then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });
