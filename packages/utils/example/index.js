// import xy from '../src';

// import {getToken, xyPost} from '../src';

// import xyClickoutside from './clickoutside';

// xyPost.config({
//   baseURL: '//some.api:11310/v1/',
// });
// xyPost.bizErrorHandler(function (res) {
//   return res;
// });
// // xyPost.catchErrorHandler()
// xyPost.post('shop/get-district-info', {a: 123})

// export { xyClickoutside }
import { get, post } from "../src/index";
// get.bizErrorHandler(res => {
//   console.log(res)
// });
// get("https://cn.vuejs.org/v2/guide/typescript.html", {
//   abc: 123,
//   a: 123,
//   d: 123,
// }).then(res => {
//   console.log(res);
// });
post.bizErrorHandler(res => {
  console.log(res);
});
post.catchErrorHandler(err => {
  console.log(err)
})
post("/v2/guide/typescript.html", {
  abc: 123,
  a: 123,
  d: 123,
}).then(res => {
  console.log(res);
});
// get
//   .get("https://cn.vuejs.org/v2/guide/typescript.html")
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });
