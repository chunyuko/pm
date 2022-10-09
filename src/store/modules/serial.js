import { getPages } from "@/core/utils";
import api from "@/libs/api";

const seri = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_seri: (state, res) => {
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
    load_seri({ state, commit, getters, dispatch }, params) {
      return api.serial
        .list()
        .then((res) => {
          commit("set_seri", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_seri({ state, commit, getters, dispatch }, params) {
      return dispatch("load_seri", params);
    },
    // 获取信息列表
    list_seri({ state, commit, getters, dispatch }, params) {
      let res = state.result.data
        ? new Promise((resolve, reject) => {
            return resolve(state.result);
          })
        : dispatch("load_seri", params);

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
    add_seri({ state, commit, getters, dispatch }, params) {
      return api.serial
        .add({ data: params })
        .then((res) => {
          commit("set_seri", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_seri({ state, commit, getters, dispatch }, params) {
      return api.serial
        .edit({ data: params })
        .then((res) => {
          commit("set_seri", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_seri({ state, commit, getters, dispatch }, params) {
      return api.serial
        .del({ data: params })
        .then((res) => {
          commit("set_seri", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_seri({ state, commit, getters, dispatch }, params) {
      return api.serial
        .del_multi({ data: params })
        .then((res) => {
          commit("set_seri", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default seri;
