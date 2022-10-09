import { getPages } from "@/core/utils";
import api from "@/libs/api";

const image = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_image: (state, res) => {
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
    load_image({ state, commit, getters, dispatch }, params) {
      return api.image
        .list({ params: { content: params.id } })
        .then((res) => {
          commit("set_image", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_image({ state, commit, getters, dispatch }, params) {
      return dispatch("load_image", params);
    },
    // 获取信息列表
    list_image({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_image", params);
      let res = dispatch("load_image", params);
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
    add_image({ state, commit, getters, dispatch }, params) {
      return api.image
        .add({ data: params })
        .then((res) => {
          commit("set_image", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_image({ state, commit, getters, dispatch }, params) {
      return api.image
        .edit({ data: params })
        .then((res) => {
          commit("set_image", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_image({ state, commit, getters, dispatch }, params) {
      return api.image
        .del({ data: params })
        .then((res) => {
          commit("set_image", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_image({ state, commit, getters, dispatch }, params) {
      return api.image
        .del_multi({ data: params })
        .then((res) => {
          commit("set_image", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default image;
