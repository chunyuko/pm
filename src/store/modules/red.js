import { getPages } from "@/core/utils";
import api from "@/libs/api";

const infrared = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_red: (state, res) => {
      let len = res.data.length,
        pageSize = res.pageSize,
        pageNo = res.pageNo;
      state.result = { data: res.data, totalCount: len, totalPage: getPages(len, pageSize), pageNo, pageSize };
    },
    set_length: (state, val) => {
      state.length = Object.keys(val).length;
    },
  },

  actions: {
    load_red({ state, commit, getters, dispatch }, params) {
      return api.red
        .list()
        .then((res) => {
          commit("set_red", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_red({ state, commit, getters, dispatch }, params) {
      return dispatch("load_red", params);
    },
    // 获取信息列表
    list_red({ state, commit, getters, dispatch }, params) {
      let res = state.result.data
        ? new Promise((resolve, reject) => {
            return resolve(state.result);
          })
        : dispatch("load_red", params);

      return res.then((data) => {
        return new Promise((resolve, reject) => {
          setTimeout(function () {
            return resolve(Object.assign(data, params));
          }, 200);
        }).then((res) => {
          return Promise.resolve(res);
        });
      });
    },
    add_red({ state, commit, getters, dispatch }, params) {
      return api.red
        .add({ data: params })
        .then((res) => {
          commit("set_red", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_red({ state, commit, getters, dispatch }, params) {
      return api.red
        .edit({ data: params })
        .then((res) => {
          commit("set_red", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_red({ state, commit, getters, dispatch }, params) {
      return api.red
        .del({ data: params })
        .then((res) => {
          commit("set_red", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_red({ state, commit, getters, dispatch }, params) {
      return api.red
        .del_multi({ data: params })
        .then((res) => {
          commit("set_red", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default infrared;
