import Vue from "vue";
import * as server from "@/libs/server";
import request from "@/libs/server";
import * as urls from "./urls";
import { is } from "@/core/utils";
const api = {};

const signApi = (urls) => {
  Object.entries(urls).forEach((url) => {
    api[url[0]] = {};
    generateApi(api[url[0]], url[1]);
    // Object.entries(url[1]).forEach((item) => {
    //   api[url[0]][item[0]] = function (options = {}, params = {}) {
    //     let val = item[1],
    //       sender = request;
    //     if (is(val, "object")) {
    //       let key = Object.keys(val)[0];
    //       sender = server[key] ? server[key] : sender;
    //       val = val[key];
    //     }
    //     return sender(Object.assign({ url: is(val, "function") ? val(params) : val }, options));
    //   };
    // });
  });
};

const generateApi = (parent, child) => {
  Object.entries(child).forEach((item) => {
    parent[item[0]] = function (options = {}, params = {}) {
      let val = item[1],
        sender = request;
      if (is(val, "object")) {
        let key = Object.keys(val)[0];
        sender = server[key] ? server[key] : sender;
        val = val[key];
      }
      return sender(Object.assign({ url: is(val, "function") ? val(params) : val }, options));
    };
  });
};

signApi(urls);
let initRequest = server.initRequest;

Object.defineProperty(Vue.prototype, "$api", { value: api });
Vue.prototype.$request = request;

export default api;

export { signApi, generateApi, initRequest };
