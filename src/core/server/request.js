import axios from "axios";
import { is } from "@/core/utils";

const baseURL = "/";
const timeout = 6000;

const request = function (opt) {
  try {
    let opts = Object.assign({}, options, opt);
    return instance(opts)
      .then((res) => {
        let data = opts.name && res[opts.name] ? res[opts.name] : res;
        is(hook.success, "function") && hook.success(data, opts);
        opts.isLog && console.log("response>>>", res, "data>>>", data);
        return Promise.resolve(data);
      })
      .catch((error) => {
        const {
          response: { status, statusText },
        } = error;
        // notification.error({ message: status, description: statusText });
        let isNext = is(hook.fail, "function") ? hook.fail(status, statusText, opts, error) : true;

        // console.log("isNext>>>", isNext);
        return isNext && Promise.reject(error);
      });
  } catch (e) {
    return e;
  }
};
const getMethod = function (type) {
  return function (opt) {
    opt.method = type;
    return request(opt);
  };
};
const get = getMethod("get");
const post = getMethod("post");
const del = getMethod("delete");
const put = getMethod("put");
const patch = getMethod("patch");
const hook = {
  success: undefined, //结果提示框
  fail: undefined, //加载进度
  before: undefined,
  after: undefined,
};
const options = {
  method: "get",
  // name: "data",
};
//创建axios实例
const instance = axios.create({
  baseURL: baseURL,
  timeout: timeout,
  // 跨越请求需要待COOKie身份识别
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
});
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // if (config.method == "post" && config.params) {
    //   // 老版本post请求参数都是在params，这里统一处理
    //   config.data = JSON.stringify(config.params);
    //   delete config.params;
    // }
    let con = is(hook.before, "function") ? hook.before(config) : config;
    return con ? con : config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//响应拦截器
instance.interceptors.response.use(
  (response) => {
    let res = is(hook.after, "function") ? hook.after(response) : response;
    return res ? res : response;
  },
  (error) => {
    let isNext = true;
    if (error.response) {
      let status = error.response.status,
        fn = hook[status] || hook[status + ""];
      isNext = is(fn, "function") ? fn(error) : true;
    }
    return isNext && Promise.reject(error);
  }
);

export default request;

export { get, post, put, patch, del, hook, instance, options };
