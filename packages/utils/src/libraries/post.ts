import axios from 'axios';
import qs from 'qs';
import { getToken } from './token';

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

const xyPost = {
  defaultConfig: {
    headers: {},
    baseURL: '',
    timeout: 10000,
  },
  bizErrorStatus: true,
  bizErrorHandler(cb):object {
    if (typeof cb === 'function') {
      const res = cb();
      if (typeof res === 'boolean') this.bizErrorStatus = res;
    }
    return this;
  },
  config(args:object = {}):object {
    for (const name in args) {
      this.defaultConfig[name] = args[name];
    }
    return this;
  },
  checkStatus(res) {
    if (res.status >= 400) {
      return Promise.reject(res);
    }
    return res;
  },
  catchErrorFunction: null,
  catchErrorHandler(cb = () => {}):void {
    this.catchErrorFunction = cb;
  },
  /**
   * @param api
   * @param args
   * @param selfHandleError 是否自行处理业务错误，默认 false
   * @return {*}
   */
  post(api:string, args:object, selfHandleError:boolean = false) {
    // 如果不是完整url，即接口请求时，就加上自定义header，并设置baseURL
    if (!/(http:\/\/)|(https:\/\/)/.test(api)) {
      this.defaultConfig.headers = {
        ...this.defaultConfig.headers,
        Authorization: getToken(),
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      };
    } else {
      // Mock
      return axios.get(api).then(res => res.data);
    }

    // 格式化参数
    const formParams = qs.stringify(args, { arrayFormat: 'indices' });

    return axios
      .post(api, formParams, this.defaultConfig)
      .then(this.checkStatus)
      .then(res => {
        // 如果是自行处理业务错误，那么就直接返回接口数据，不再统一处理。
        if (selfHandleError) {
          return res.data;
        }

        // 业务错误处理
        if (this.bizErrorStatus === false) {
          return Promise.reject(res);
        }

        return res.data;
      })
      .catch(err => {
        if (typeof this.catchErrorFunction === 'function') {
          this.catchErrorFunction(err);
        } else {
          throw new Error(JSON.stringify(err.data));
        }
      });
  },
};

export default xyPost;
