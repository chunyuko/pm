import { getPages } from "@/core/utils";
import api from "@/libs/api";

const circleList = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_circleList: (state, res) => {
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
    load_circleList({ state, commit, getters, dispatch }, params) {
      return api.circleList
        .list({ params: { faults: params.id } })
        .then((res) => {
          commit("set_circleList", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_circleList({ state, commit, getters, dispatch }, params) {
      return dispatch("load_circleList", params);
    },
    // 获取信息列表
    list_circleList({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_circleList", params);
      let res = dispatch("load_circleList", params);
      // return res;
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
    add_circleList({ state, commit, getters, dispatch }, params) {
      return api.circleList
        .add({ data: params })
        .then((res) => {
          commit("set_circleList", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_circleList({ state, commit, getters, dispatch }, params) {
      return api.circleList
        .edit({ data: params })
        .then((res) => {
          commit("set_circleList", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_circleList({ state, commit, getters, dispatch }, params) {
      return api.circleList
        .del({ data: params })
        .then((res) => {
          commit("set_circleList", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_circleList({ state, commit, getters, dispatch }, params) {
      return api.circleList
        .del_multi({ data: params })
        .then((res) => {
          commit("set_circleList", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default circleList;
