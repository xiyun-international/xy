import axios, { AxiosResponse } from "axios";
import qs from "qs";
import { getToken } from "./token";
import { trim, assignWith } from "lodash";
import { isFunction } from "./utils";

type multiType = string | object | Function;

const http = {
  defaultConfig: {
    headers: {},
    baseURL: "",
    timeout: 10000,
    qs: {} // qs 配置项
  },
  selfHandleError: false,
  bizErrorFunction: null,
  catchErrorFunction: null,
  // 业务错误逻辑处理
  checkBiz(res): multiType {
    // 如果该参数设为 true，则表明是在请求的地方去自行处理错误，照常返回数据
    if (this.selfHandleError === true) {
      return res.data;
    }
    // 如果配置了业务处理函数则调用该函数
    if (isFunction(this.bizErrorFunction)) {
      return this.bizErrorFunction(res);
    }
    // 其它情况正常返回数据
    return res.data;
  },
  // 配置自定义的业务错误处理函数
  bizErrorHandler(cb: Function): void {
    if (isFunction(cb)) {
      this.bizErrorFunction = cb;
    }
  },
  // 整合自定义配置项
  config(args: object = {}): void {
    for (const name in args) {
      this.defaultConfig[name] = args[name];
    }
  },
  // 配置自定义的公共非业务级错误处理函数
  catchErrorHandler(cb: Function): void {
    if (isFunction(cb)) {
      this.catchErrorFunction = cb;
    }
  },
  /**
   * @param api
   * @param args
   * @param selfHandleError 是否自行处理业务错误，默认 false
   * @return Promise<void | AxiosResponse>
   */
  post(
    api: string,
    args: object,
    selfHandleError?: boolean
  ): Promise<void | AxiosResponse> {
    this.selfHandleError = selfHandleError || false;
    this.defaultConfig.headers = {
      Authorization: getToken() || "",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      ...this.defaultConfig.headers
    };

    // 过滤掉参数中的前后空格
    const trimmedParams = {};
    assignWith(
      trimmedParams,
      args,
      (objValue, srcValue): string => trim(srcValue)
    );

    // 格式化参数
    const formParams = qs.stringify(args, {
      arrayFormat: "indices",
      ...this.defaultConfig.qs
    });

    return axios
      .post(api, formParams, this.defaultConfig)
      .then(this.checkBiz.bind(this))
      .catch(
        (err): void => {
          if (isFunction(this.catchErrorFunction)) {
            this.catchErrorFunction(err);
          } else {
            throw new Error(err);
          }
        }
      );
  },
  /**
   * @param api
   * @param args
   * @param selfHandleError 是否自行处理业务错误，默认 false
   * @return Promise<void | AxiosResponse>
   */
  get(
    api: string,
    args: object,
    selfHandleError?: boolean
  ): Promise<void | AxiosResponse> {
    this.selfHandleError = selfHandleError || false;
    this.defaultConfig.headers = {
      Authorization: getToken(),
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      ...this.defaultConfig.headers
    };

    // 过滤掉参数中的前后空格
    const trimmedParams = {};
    assignWith(
      trimmedParams,
      args,
      (objValue, srcValue): string => trim(srcValue)
    );

    // 格式化参数 格式化后发 get 请求，会发以0=开头的参数
    // const formParams = qs.stringify(args, {
    //   arrayFormat: "indices",
    //   ...this.defaultConfig.qs
    // });

    // delete this.defaultConfig.qs;

    return axios
      .get(api, {
        ...this.defaultConfig,
        params: trimmedParams
      })
      .then(this.checkBiz.bind(this))
      .catch(
        (err): void => {
          if (isFunction(this.catchErrorFunction)) {
            this.catchErrorFunction(err);
          } else {
            throw new Error(err);
          }
        }
      );
  }
};

export default http;
