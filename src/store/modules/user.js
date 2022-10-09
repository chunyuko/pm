// import storage from 'store'
// import { login, getInfo, logout } from '@/api/login'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'
import api from "@/libs/api";
import { is } from "@/core/utils";
const user = {
  state: {
    info: {},
    length: 0,
  },

  mutations: {
    setUser: (state, val) => {
      if (is(val, "object") && Object.keys(val).length > 0) {
        Object.entries(val).forEach((item) => {
          state.info[item[0]] = item[1];
        });
        state.length = Object.keys(state.info).length;
      } else {
        state.info = {};
        state.length = 0;
      }
      console.log("roles>>>>>", is(state.info.roles, "Array"));
    },
  },

  actions: {
    // 获取用户信息
    getUser({ state, commit, getters, dispatch }) {
      return new Promise((resolve, reject) => {
        api.user
          .info({ msg: false })
          .then((res) => {
            const data = res.data ? res.data : [];
            let access = false;
            console.log("验证登入信息。。。", data);
            if (data.length > 0) {
              access = true;
              commit("setUser", data[0]);
            }
            resolve(access);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    login({ state, commit, getters, dispatch }, params) {
      console.log("提交登入的数据：", params);
      return new Promise((resolve, reject) => {
        api.login.in({ data: params }).then((res) => {
          // const data = res.data ? res.data : [];
          // data.length > 0 && commit("setUser", data[0]);
          return resolve(res);
        });
        // setTimeout(() => {
        //   return resolve({ success: true, msg: "登入成功" });
        // }, 1000);
      });
    },
    logout({ state, commit, getters, dispatch }, params) {
      return new Promise((resolve, reject) => {
        api.login.out({ data: params }).then((res) => {
          // const data = res.data ? res.data : [];
          // data.length > 0 && commit("setUser", data[0]);
          return resolve(res);
        });
        // setTimeout(() => {
        //   return resolve({ success: true, msg: "登入成功" });
        // }, 1000);
      });
    },
    // 登录
    // Login({ commit }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     login(userInfo)
    //       .then((response) => {
    //         const result = response.result;
    //         storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
    //         commit("SET_TOKEN", result.token);
    //         resolve();
    //       })
    //       .catch((error) => {
    //         reject(error);
    //       });
    //   });
    // },
    // // 登出
    // Logout({ commit, state }) {
    //   return new Promise((resolve) => {
    //     logout(state.token)
    //       .then(() => {
    //         commit("SET_TOKEN", "");
    //         commit("SET_ROLES", []);
    //         storage.remove(ACCESS_TOKEN);
    //         resolve();
    //       })
    //       .catch(() => {
    //         resolve();
    //       })
    //       .finally(() => {});
    //   });
    // },
  },
};

export default user;
