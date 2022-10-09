import { getPages } from "@/core/utils";
import api from "@/libs/api";

const ppt = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_ppt: (state, res) => {
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
    load_ppt({ state, commit, getters, dispatch }, params) {
      return api.ppt
        .list({ params: { content: params.id } })
        .then((res) => {
          commit("set_ppt", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_ppt({ state, commit, getters, dispatch }, params) {
      return dispatch("load_ppt", params);
    },
    // 获取信息列表
    list_ppt({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_ppt", params);
      let res = dispatch("load_ppt", params);
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
    add_ppt({ state, commit, getters, dispatch }, params) {
      let path = params.get("path");
      path.size && params.set("size", path.size);
      return api.ppt
        .add({ data: params, params: { toMulti: false } })
        .then((res) => {
          commit("set_ppt", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_ppt({ state, commit, getters, dispatch }, params) {
      let path = params.get("path");
      path.size && params.set("size", path.size);
      return api.ppt
        .edit({ data: params, params: { toMulti: false } })
        .then((res) => {
          commit("set_ppt", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_ppt({ state, commit, getters, dispatch }, params) {
      return api.ppt
        .del({ data: params })
        .then((res) => {
          commit("set_ppt", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_ppt({ state, commit, getters, dispatch }, params) {
      return api.ppt
        .del_multi({ data: params })
        .then((res) => {
          commit("set_ppt", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default ppt;
