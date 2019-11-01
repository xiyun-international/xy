import Vue from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import qs from 'qs';

// 全局提示的全局配置
message.config({
  maxCount: 1,
  duration: 2,
});

// axios全局配置
Object.assign(axios.defaults, {
  // baseURL: "http://localhost:3000",
  // get请求需要序列化参数, 否则部分会变成字符串
  paramsSerializer: function(params) {
    return qs.stringify(params);
  },
});

// axios响应拦截
axios.interceptors.response.use(
  function(response) {
    // if (typeof response.data === 'string') {
    //   message.success(response.data);
    // }
    return response;
  },
  function(error) {
    message.error(error.response.data);
    return Promise.reject(error);
  },
);

Vue.prototype.$get = axios.get;
Vue.prototype.$post = axios.post;
