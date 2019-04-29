// import xy from '../src';

import {getToken, xyPost} from '../src'

xyPost.config({
  baseURL: '//some.api:11310/v1/',
});
xyPost.bizErrorHandler(function () {
  return false;
});
// xyPost.catchErrorHandler()
xyPost.post('shop/get-district-info', {a: 123})
