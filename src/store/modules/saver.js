import { getPages } from "@/core/utils";
import api from "@/libs/api";

const saver = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_saver: (state, res) => {
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
    load_saver({ state, commit, getters, dispatch }, params) {
      return api.saver
        .list({ params: { content: params.id } })
        .then((res) => {
          commit("set_saver", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_saver({ state, commit, getters, dispatch }, params) {
      return dispatch("load_saver", params);
    },
    // 获取信息列表
    list_saver({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_saver", params);
      let res = dispatch("load_saver", params);
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
    add_saver({ state, commit, getters, dispatch }, params) {
      return api.saver
        .add({ data: params })
        .then((res) => {
          commit("set_saver", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_saver({ state, commit, getters, dispatch }, params) {
      return api.saver
        .edit({ data: params })
        .then((res) => {
          commit("set_saver", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_saver({ state, commit, getters, dispatch }, params) {
      return api.saver
        .del({ data: params })
        .then((res) => {
          commit("set_saver", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_saver({ state, commit, getters, dispatch }, params) {
      return api.saver
        .del_multi({ data: params })
        .then((res) => {
          commit("set_saver", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default saver;
