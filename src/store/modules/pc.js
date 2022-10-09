import { getPages } from "@/core/utils";
import api from "@/libs/api";

const host = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_pc: (state, res) => {
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
    load_pc({ state, commit, getters, dispatch }, params) {
      return api.pc
        .list()
        .then((res) => {
          commit("set_pc", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_pc({ state, commit, getters, dispatch }, params) {
      return dispatch("load_pc", params);
    },
    // 获取信息列表
    list_pc({ state, commit, getters, dispatch }, params) {
      let res = state.result.data
        ? new Promise((resolve, reject) => {
            return resolve(state.result);
          })
        : dispatch("load_pc", params);

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
    add_pc({ state, commit, getters, dispatch }, params) {
      return api.pc
        .add({ data: params })
        .then((res) => {
          commit("set_pc", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_pc({ state, commit, getters, dispatch }, params) {
      return api.pc.edit({ data: params }).then((res) => {
        commit("set_pc", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
        return res;
      });
    },
    del_pc({ state, commit, getters, dispatch }, params) {
      return api.pc.del({ data: params }).then((res) => {
        commit("set_pc", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
        return res;
      });
    },
    del_multi_pc({ state, commit, getters, dispatch }, params) {
      return api.pc.del_multi({ data: params }).then((res) => {
        commit("set_pc", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
        return res;
      });
    },
  },
};

export default host;
