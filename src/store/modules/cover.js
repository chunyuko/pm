import { getPages } from "@/core/utils";
import api from "@/libs/api";

const cover = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_cover: (state, res) => {
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
    load_cover({ state, commit, getters, dispatch }, params) {
      return api.cover
        .list({ params: { content: params.id } })
        .then((res) => {
          commit("set_cover", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_cover({ state, commit, getters, dispatch }, params) {
      return dispatch("load_cover", params);
    },
    // 获取信息列表
    list_cover({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_cover", params);
      let res = dispatch("load_cover", params);
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
    add_cover({ state, commit, getters, dispatch }, params) {
      return api.cover
        .add({ data: params })
        .then((res) => {
          commit("set_cover", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_cover({ state, commit, getters, dispatch }, params) {
      return api.cover
        .edit({ data: params })
        .then((res) => {
          commit("set_cover", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_cover({ state, commit, getters, dispatch }, params) {
      return api.cover
        .del({ data: params })
        .then((res) => {
          commit("set_cover", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_cover({ state, commit, getters, dispatch }, params) {
      return api.cover
        .del_multi({ data: params })
        .then((res) => {
          commit("set_cover", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default cover;
