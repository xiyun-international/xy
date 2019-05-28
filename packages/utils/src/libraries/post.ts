import axios from "axios";
import qs from "qs";
import { getToken } from "./token";

const xyPost = {
  defaultConfig: {
    headers: {},
    baseURL: "",
    timeout: 10000
  },
  selfHandleError: false,
  bizErrorFunction: null,
  checkBiz(res) {
    if (this.selfHandleError) {
      return res.data;
    }
    if (this.bizErrorFunction) {
      return this.bizErrorFunction(res);
    }
    return res.data;
  },
  bizErrorHandler(cb): void {
    if (typeof cb === "function") {
      this.bizErrorFunction = cb;
    }
  },
  config(args: object = {}): object {
    for (const name in args) {
      this.defaultConfig[name] = args[name];
    }
    return this;
  },
  checkStatus(res): object | any {
    if (res.status >= 400) {
      return Promise.reject(res);
    }
    return res;
  },
  catchErrorFunction: null,
  catchErrorHandler(cb): void {
    if (typeof cb === "function") {
      this.catchErrorFunction = cb;
    }
  },
  /**
   * @param api
   * @param args
   * @param selfHandleError 是否自行处理业务错误，默认 false
   * @return {*}
   */
  post(api: string, args: object, selfHandleError: boolean = false) {
    this.selfHandleError = selfHandleError;
    // 如果不是完整url，即接口请求时，就加上自定义header，并设置baseURL
    if (!/(http:\/\/)|(https:\/\/)/.test(api)) {
      this.defaultConfig.headers = {
        Authorization: getToken(),
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        ...this.defaultConfig.headers
      };
    } else {
      // Mock
      return axios.get(api).then(res => res.data);
    }

    // 格式化参数
    const formParams = qs.stringify(args, { arrayFormat: "indices" });

    return axios
      .post(api, formParams, this.defaultConfig)
      .then(this.checkStatus)
      .then(this.checkBiz)
      .catch(err => {
        if (typeof this.catchErrorFunction === "function") {
          this.catchErrorFunction(err);
        } else {
          throw new Error(JSON.stringify(err.data));
        }
      });
  }
};

export default xyPost;
