import * as _axios_ from "@/core/server/request";
import config from "@/libs/config";
const { default: request, get, post, del, put, patch, hook, instance, options } = _axios_;
const { defaults, ...hookCon } = config.request;

const initRequest = function (val, type = "base") {
  let obj = type == "base" ? instance.defaults : type == "hook" ? hook : options;
  for (let attr in val) {
    obj[attr] = val[attr];
  }
};

initRequest(defaults);
initRequest(hookCon, "hook");

export default request;
export { get, post, del, put, patch, hook, initRequest };
