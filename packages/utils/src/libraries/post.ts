import axios from "axios";
import qs from "qs";
import { getToken } from "./token";

const post = function(
  api: string,
  args?: object,
  selfHandleError: boolean = false
): Function {
  return new post.prototype.init(api, args, selfHandleError);
};

post.defaultConfig = {
  headers: {},
  baseURL: "",
  timeout: 10000
};

post.selfHandleError = false;
post.bizErrorFunction = null;
post.checkBiz = (res): string => {
  if (post.selfHandleError) {
    return res.data;
  }
  if (post.bizErrorFunction) {
    return post.bizErrorFunction(res);
  }
  return res.data;
};
post.bizErrorHandler = (cb): void => {
  if (typeof cb === "function") {
    post.bizErrorFunction = cb;
  }
};
post.config = (args: object = {}): void => {
  for (const name in args) {
    post.defaultConfig[name] = args[name];
  }
};
post.checkStatus = (res): object => {
  if (res.status >= 400) {
    return Promise.reject(res);
  }
  return res;
};
post.catchErrorFunction = null;
post.catchErrorHandler = (cb): void => {
  if (typeof cb === "function") {
    post.catchErrorFunction = cb;
  }
};

/**
 * @param api
 * @param args
 * @param selfHandleError 是否自行处理业务错误，默认 false
 * @return {*}
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
post.prototype.init = function(
  api: string,
  args: object,
  selfHandleError: boolean = false
) {
  post.selfHandleError = selfHandleError;
  // 如果不是完整url，即接口请求时，就加上自定义header，并设置baseURL
  if (!/(http:\/\/)|(https:\/\/)/.test(api)) {
    post.defaultConfig.headers = {
      Authorization: getToken(),
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      ...post.defaultConfig.headers
    };
  } else {
    // Mock
    return axios.get(api).then(res => res.data);
  }

  // 格式化参数
  const formParams = qs.stringify(args, { arrayFormat: "indices" });

  return axios
    .post(api, formParams, post.defaultConfig)
    .then(post.checkStatus)
    .then(post.checkBiz)
    .catch(err => {
      if (typeof post.catchErrorFunction === "function") {
        post.catchErrorFunction(err);
      } else {
        throw new Error(JSON.stringify(err.data));
      }
    });
};

export default post;
