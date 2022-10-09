import { getPages } from "@/core/utils";
import api from "@/libs/api";

const convert = function (data, tar) {
  tar = tar ? tar : {};
  data.forEach((v) => {
    tar[v.id] = v;
  });
  return tar;
};

const groups = {
  state: {
    result: {},
    mapping: { content: {}, electric: {}, red: {}, serail: {}, pc: {} },
  },

  mutations: {
    set_groups_scene: (state, res, params) => {
      state.result.groups = res.data.groups;
    },
    set_electric_scene: (state, res, params) => {
      state.result.electric = res.data.electric;
      state.result.electric.length = res.data.electric.length;
      state.mapping["electric"] = convert(res.data.electric, state.mapping["electric"]);
    },

    set_red_scene: (state, res, params) => {
      state.result.red = res.data.red;
      state.result.red.length = res.data.red.length;
      state.mapping["red"] = convert(state.result.red, state.mapping["red"]);
    },
    set_serial_scene: (state, res, params) => {
      state.result.serial = res.data.serial;
      state.result.serial.length = res.data.serial.length;
      state.mapping["serial"] = convert(state.result.serial, state.mapping["serial"]);
    },
    set_pc_scene: (state, res, params) => {
      state.result.pc = res.data.pc;
      state.result.pc.length = res.data.pc.length;
      state.mapping["pc"] = convert(state.result.pc, state.mapping["pc"]);
    },
    set_content_scene: (state, res, params) => {
      state.result.content = res.data.content;
      state.result.content.length = res.data.content.length;
      state.mapping["content"] = convert(state.result.content, state.mapping["content"]);
    },
    set_length: (state, val) => {
      state.length = Object.keys(val).length;
    },
  },

  actions: {
    load_groups({ state, commit, getters, dispatch }, params) {
      return api.groups
        .list()
        .then((res) => {
          commit("set_groups_scene", Object.assign(res, params));
          commit("set_electric_scene", Object.assign(res, params));
          commit("set_red_scene", Object.assign(res, params));
          commit("set_serial_scene", Object.assign(res, params));
          commit("set_pc_scene", Object.assign(res, params));
          commit("set_content_scene", Object.assign(res, params));
          return state.result;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    reload_groups({ state, commit, getters, dispatch }, params) {
      return dispatch("load_groups", params);
    },
    // 获取信息列表
    list_groups({ state, commit, getters, dispatch }, params) {
      let res = state.result.data
        ? new Promise((resolve, reject) => {
            return resolve(state.result);
          })
        : dispatch("load_groups", params);
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
    add_groups({ state, commit, getters, dispatch }, params) {
      return api.groups
        .add({ data: params })
        .then((res) => {
          commit("set_groups_scene", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    update_groups({ state, commit, getters, dispatch }, params) {
      return api.groups
        .edit({ data: params })
        .then((res) => {
          commit("set_groups_scene", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_groups({ state, commit, getters, dispatch }, params) {
      return api.groups
        .del({ data: params })
        .then((res) => {
          commit("set_groups_scene", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    del_multi_groups({ state, commit, getters, dispatch }, params) {
      return api.groups
        .del_multi({ data: params })
        .then((res) => {
          commit("set_groups_scene", Object.assign(res, { pageNo: params.pageNo, pageSize: params.pageSize }));
          return res;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};

export default groups;
