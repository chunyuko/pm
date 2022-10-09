import { getPages, maxItem, minItem } from "@/core/utils";
import api from "@/libs/api";

const questions = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_questions: (state, res) => {
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
    load_questions({ state, commit, getters, dispatch }, params) {
      return api.questions
        .list({ params: { sections: params.id } })
        .then((res) => {
          // console.log(res);
          commit("set_questions", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_questions({ state, commit, getters, dispatch }, params) {
      return dispatch("load_questions", params);
    },
    // 获取信息列表
    list_questions({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_que", params);
      let res = dispatch("load_questions", params);
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
    add_questions({ state, commit, getters, dispatch }, params) {
      return api.questions
        .add({ data: params })
        .then((res) => {
          commit("set_questions", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_questions({ state, commit, getters, dispatch }, params) {
      return api.questions
        .edit({ data: params })
        .then((res) => {
          commit("set_questions", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_questions({ state, commit, getters, dispatch }, params) {
      return api.questions
        .del({ data: params })
        .then((res) => {
          commit("set_questions", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_questions({ state, commit, getters, dispatch }, params) {
      return api.questions
        .del_multi({ data: params })
        .then((res) => {
          commit("set_questions", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default questions;
