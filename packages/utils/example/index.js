import http from "../lib/libraries/http";

http.config({
  baseURL: "http://t2112.yzbizcenter-api.yunzong:11045/api"
});
// http.bizErrorHandler(res => {
//   if (res.data.status !== 10000) {
//     message.error(res.data.message);
//     return Promise.reject(res);
//   }
//   return res;
// });
http.post("/v1/user/login", {
    username: "18514431819",
    password: "123456",
    verification: ""
  }).then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
// http
//   .get("/v1/user/login", {
//     username: "",
//     password: ""
//   })
//   .then(res => {
//     console.log(res);
//   });
