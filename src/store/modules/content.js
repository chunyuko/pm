import { getPages } from "@/core/utils";
import api from "@/libs/api";

const content = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_content: (state, res) => {
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
    load_content({ state, commit, getters, dispatch }, params) {
      return api.content
        .list({ msg: false })
        .then((res) => {
          commit("set_content", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_content({ state, commit, getters, dispatch }, params) {
      return dispatch("load_content", params);
    },
    // 获取信息列表
    list_content({ state, commit, getters, dispatch }, params) {
      let res = state.result.data
        ? new Promise((resolve, reject) => {
            return resolve(state.result);
          })
        : dispatch("load_content", params);

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
    add_content({ state, commit, getters, dispatch }, params) {
      return api.content
        .add({ data: params })
        .then((res) => {
          commit("set_content", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_content({ state, commit, getters, dispatch }, params) {
      return api.content
        .edit({ data: params })
        .then((res) => {
          commit("set_content", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_content({ state, commit, getters, dispatch }, params) {
      return api.content
        .del({ data: params })
        .then((res) => {
          commit("set_content", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_content({ state, commit, getters, dispatch }, params) {
      return api.content
        .del_multi({ data: params })
        .then((res) => {
          commit("set_content", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default content;
