import { getPages } from "@/core/utils";
import api from "@/libs/api";

const files = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_files: (state, res) => {
      let len = res.data.length,
        pageSize = res.pageSize,
        pageNo = res.pageNo,
        success = res.success,
        msg = res.msg;
      state.result = {
        data: res.data,
        totalCount: len,
        totalPage: getPages(len, pageSize),
        pageNo,
        pageSize,
        msg,
        success,
      };
    },
    set_length: (state, val) => {
      state.length = Object.keys(val).length;
    },
  },

  actions: {
    load_files({ state, commit, getters, dispatch }, params) {
      return api.files
        .list()
        .then((res) => {
          commit("set_files", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_files({ state, commit, getters, dispatch }, params) {
      return dispatch("load_files", params);
    },
    // 获取信息列表
    list_files({ state, commit, getters, dispatch }, params) {
      let res = state.result.data
        ? new Promise((resolve, reject) => {
            return resolve(state.result);
          })
        : dispatch("load_files", params);
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
    add_files({ state, commit, getters, dispatch }, params) {
      return api.files
        .add({ data: params })
        .then((res) => {
          commit("set_files", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_files({ state, commit, getters, dispatch }, params) {
      return api.files
        .edit({ data: params })
        .then((res) => {
          commit("set_files", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_files({ state, commit, getters, dispatch }, params) {
      return api.files
        .del({ data: params })
        .then((res) => {
          commit("set_files", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_files({ state, commit, getters, dispatch }, params) {
      return api.files
        .del_multi({ data: params })
        .then((res) => {
          commit("set_files", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default files;
