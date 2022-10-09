import { getPages, maxItem, minItem } from "@/core/utils";
import api from "@/libs/api";

const faults = {
  state: {
    result: {},
    length: 0,
  },

  mutations: {
    set_faults: (state, res) => {
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
    load_faults({ state, commit, getters, dispatch }, params) {
      return api.faults
        .list({ params: { sections: params.id } })
        .then((res) => {
          // console.log(res);
          commit("set_faults", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_faults({ state, commit, getters, dispatch }, params) {
      return dispatch("load_faults", params);
    },
    // 获取信息列表
    list_faults({ state, commit, getters, dispatch }, params) {
      // let res = state.result.data
      //   ? new Promise((resolve, reject) => {
      //       return resolve(state.result);
      //     })
      //   : dispatch("load_que", params);
      let res = dispatch("load_faults", params);
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
    add_faults({ state, commit, getters, dispatch }, params) {
      return api.faults
        .add({ data: params })
        .then((res) => {
          commit("set_faults", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_faults({ state, commit, getters, dispatch }, params) {
      return api.faults
        .edit({ data: params })
        .then((res) => {
          commit("set_faults", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_faults({ state, commit, getters, dispatch }, params) {
      return api.faults
        .del({ data: params })
        .then((res) => {
          commit("set_faults", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_faults({ state, commit, getters, dispatch }, params) {
      return api.faults
        .del_multi({ data: params })
        .then((res) => {
          commit("set_faults", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    add_faults_ports({ state, commit, getters, dispatch }, params) {
      let data = [],
        total = params.total ? params.total : 0;
      for (let i = 0; i < 8; i++) {
        let index = i + 1;
        if (params.data.title == "") {
          data.push(
            Object.assign(
              { ...params.data },
              { title: params.data.tag + "-0" + index, port: "0" + index, number: total + index }
            )
          );
        } else {
          data.push(Object.assign({ ...params.data }, { port: "0" + index, number: total + index }));
        }
      }
      return Promise.all([
        api.faults.add({ data: data[0], msg: false }),
        api.faults.add({ data: data[1], msg: false }),
        api.faults.add({ data: data[2], msg: false }),
        api.faults.add({ data: data[3], msg: false }),
        api.faults.add({ data: data[4], msg: false }),
        api.faults.add({ data: data[5], msg: false }),
        api.faults.add({ data: data[6], msg: false }),
        api.faults.add({ data: data[7] }),
      ]).then((res) => {
        let len = res.length;
        let max = maxItem(res, (v) => v.data.length),
          index = max[0];
        len > 0 &&
          commit("set_faults", Object.assign(res[index], { pageNo: params.pageNo, pageSize: params.pageSize }));
        return res[index];
      });
    },
  },
};

export default faults;
