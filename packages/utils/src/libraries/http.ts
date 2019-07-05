import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { getToken } from './token';
import { isFunction, isObject } from './utils';

type multiType = string | object | Function;

const http = {
  contentType: {
    form: 'application/x-www-form-urlencoded;charset=utf-8',
    json: 'application/json;charset=UTF-8',
  },
  defaultConfig: {
    headers: {},
    baseURL: '',
    timeout: 10000,
    qs: {}, // qs 配置项
    isUseQs: false, // 是否使用 qs 格式化参数
    postType: '', // 不填，可以由 axios 自行决定
  },
  selfHandleError: false,
  bizErrorFunction: null,
  catchErrorFunction: null,
  // 业务错误逻辑处理
  checkBiz(res): multiType {
    // 如果配置了业务处理函数则调用该函数
    if (isFunction(this.bizErrorFunction)) {
      return this.bizErrorFunction(res.data);
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
    const keys = Object.keys(args);
    keys.forEach(
      (key): void => {
        this.defaultConfig[key] = args[key];
      },
    );
  },
  // 配置自定义的公共非业务级错误处理函数
  catchErrorHandler(cb: Function): void {
    if (isFunction(cb)) {
      this.catchErrorFunction = cb;
    }
  },
  // 错误处理函数
  errorHandler(err): Promise<void> {
    // 如果自定义了错误处理方法就交由外部来处理
    if (isFunction(this.catchErrorFunction)) {
      return this.catchErrorFunction(err, this.selfHandleError);
    } else {
      // 400 及以上的错误，会由 axios 抛出来，在这里接收到
      if (err.name === 'Error') {
        if (err.response === undefined) {
          // 网络、服务器内部等错误，没有响应体
          throw new Error(err.message);
        } else {
          // 由接口返回的非200的错误，有响应体的
          return Promise.reject(err.response.data);
        }
      } else {
        // 由业务处理函数抛出的错误，在这里接收到
        // 因为不知道自定义的业务处理函数最终会返回什么，所以要先检查 status 是不是 200
        if (isObject(err) && err.status === 200) {
          return Promise.reject(err.data);
        }
        // 否则的话，原样拒绝回去
        return Promise.reject(err);
      }
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
    selfHandleError?: boolean,
  ): Promise<void | AxiosResponse> {
    this.selfHandleError = selfHandleError || false;
    if (this.contentType[this.defaultConfig.postType]) {
      this.defaultConfig.headers['Content-Type'] = this.contentType[
        this.defaultConfig.postType
      ];
    }
    this.defaultConfig.headers = {
      ...this.defaultConfig.headers,
      // 放在最后，避免嵌套调用时被覆盖
      Authorization: getToken() || '',
    };

    // 使用 qs 格式化参数，格式化后的参数会是 form url encode 的形式
    const formParams = this.defaultConfig.isUseQs
      ? qs.stringify(args, {
          arrayFormat: 'indices',
          ...this.defaultConfig.qs,
        })
      : args;

    return axios
      .post(api, formParams, this.defaultConfig)
      .then(this.checkBiz.bind(this))
      .catch(this.errorHandler.bind(this));
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
    selfHandleError?: boolean,
  ): Promise<void | AxiosResponse> {
    this.selfHandleError = selfHandleError || false;
    this.defaultConfig.headers = {
      ...this.defaultConfig.headers,
      Authorization: getToken() || '',
    };

    return axios
      .get(api, {
        ...this.defaultConfig,
        params: args,
      })
      .then(this.checkBiz.bind(this))
      .catch(this.errorHandler.bind(this));
  },
};

export default http;
