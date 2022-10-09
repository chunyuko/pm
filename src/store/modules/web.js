import { getPages } from "@/core/utils";
import api from "@/libs/api";

const web = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_web: (state, res) => {
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
    load_web({ state, commit, getters, dispatch }, params) {
      return api.web
        .list({ params: { content: params.id } })
        .then((res) => {
          commit("set_web", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_web({ state, commit, getters, dispatch }, params) {
      return dispatch("load_web", params);
    },
    // 获取信息列表
    list_web({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_web", params);
      let res = dispatch("load_web", params);
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
    add_web({ state, commit, getters, dispatch }, params) {
      return api.web
        .add({ data: params })
        .then((res) => {
          commit("set_web", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_web({ state, commit, getters, dispatch }, params) {
      return api.web
        .edit({ data: params })
        .then((res) => {
          commit("set_web", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_web({ state, commit, getters, dispatch }, params) {
      return api.web
        .del({ data: params })
        .then((res) => {
          commit("set_web", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_web({ state, commit, getters, dispatch }, params) {
      return api.web
        .del_multi({ data: params })
        .then((res) => {
          commit("set_web", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default web;
