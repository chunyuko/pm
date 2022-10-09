// import storage from 'store'
// import { login, getInfo, logout } from '@/api/login'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'

// import api from "@/libs/api";
import { is } from "@/core/utils";
const common = {
  setting: (names) => {
    names = is(names, "array") ? names : [names];
    let state = {},
      mutations = {};
    names.forEach((name) => {
      state[name] = {};
      state[name + "_len"] = 0;
      mutations["set_" + name] = (state, val) => {
        state[name] = val;
      };
      mutations["set_" + name + "_len"] = (state, val) => {
        let len = is(val, "array") ? val.length : is(val, "object") ? Object.keys(val).length : 0;
        state[name + "_len"] = len;
      };
    });
    return { state, mutations };
  },
  state: () => {
    return {
      result: {},
      length: 0,
    };
  },
  mutations: () => {
    return {
      set_result: (state, val) => {
        // Object.entries(val).forEach((item) => {
        //   state.info[item[0]] = item[1];
        // });
        state.result = val;
      },
      set_length: (state, val) => {
        state.length = Object.keys(val).length;
      },
    };
  },
  actions: {
    fetch(action, def, page = true) {
      // 获取信息列表
      return ({ state, commit, getters, dispatch }, params) => {
        let defVal = is(def, "function") ? def(state) : false;
        let res = defVal
          ? new Promise((resolve, reject) => {
              return resolve(defVal);
            })
          : dispatch(action, params);

        return page
          ? res.then((data) => {
              return new Promise((resolve, reject) => {
                setTimeout(function () {
                  return resolve(Object.assign(data, params));
                }, 200);
              });
            })
          : res;
      };
    },
  },
};

export default common;
