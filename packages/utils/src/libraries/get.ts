import axios from "axios";

const get = function(
  api: string,
  args?: object,
  selfHandleError: boolean = false
): Function {
  return new get.prototype.init(api, args, selfHandleError);
};

get.defaultConfig = {
  headers: {},
  baseURL: "",
  timeout: 10000
};
get.selfHandleError = false;
get.bizErrorFunction = null;
get.checkBiz = (res): string => {
  if (get.selfHandleError) {
    return res.data;
  }
  if (get.bizErrorFunction) {
    return get.bizErrorFunction(res);
  }
  return res.data;
};
get.bizErrorHandler = (cb): void => {
  if (typeof cb === "function") {
    get.bizErrorFunction = cb;
  }
};
get.config = (args: object = {}): void => {
  for (const name in args) {
    get.defaultConfig[name] = args[name];
  }
};
get.checkStatus = (res): object => {
  if (res.status >= 400) {
    return Promise.reject(res);
  }
  return res;
};
get.catchErrorFunction = null;
get.catchErrorHandler = (cb): void => {
  if (typeof cb === "function") {
    get.catchErrorFunction = cb;
  }
};

get.prototype = {
  /**
   * @param api
   * @param args
   * @param selfHandleError 是否自行处理业务错误，默认 false
   * @return {*}
   */
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  init: function(api: string, args?: object, selfHandleError: boolean = false) {
    get.selfHandleError = selfHandleError;

    // 格式化参数
    const formParams = args ? args : {};

    return axios
      .get(api, {
        params: formParams,
        ...get.defaultConfig
      })
      .then(get.checkStatus)
      .then(get.checkBiz)
      .catch(
        (err): void => {
          if (typeof get.catchErrorFunction === "function") {
            get.catchErrorFunction(err);
          } else {
            throw new Error(JSON.stringify(err.data));
          }
        }
      );
  }
};

export default get;
