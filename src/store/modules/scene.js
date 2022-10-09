import { getPages } from "@/core/utils";
import api from "@/libs/api";

const convert = function (data, tar) {
  tar = tar ? tar : {};
  data.forEach((v) => {
    tar[v.id] = v;
  });
  return tar;
};

const scene = {
  state: {
    result: {},
    mapping: { content: {}, electric: {}, red: {}, serail: {}, pc: {} },
  },
  mutations: {
    set_tree_scene: (state, res, params) => {
      state.result.tree = res.data.scene;
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
    set_result: (state, res) => {
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
    load_scene({ state, commit, getters, dispatch }, params) {
      return api.scene
        .list({ msg: false })
        .then((res) => {
          commit("set_tree_scene", Object.assign(res, params));
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
    load_sence_lists({ state, commit, getters, dispatch }, params) {
      return Promise.all([
        api.scene.list({ msg: false }).then((res) => {
          commit("set_tree_scene", res, params);
          return state.result;
        }),
        api.groups.list({ msg: false }).then((res) => {
          commit("set_groups_scene", res, params);
          return state.result;
        }),
        api.electric.list({ msg: false }).then((res) => {
          commit("set_electric_scene", res, params);
          return state.electric;
        }),
        api.red.list({ msg: false }).then((res) => {
          commit("set_red_scene", res, params);
          return state.red;
        }),
        api.serial.list({ msg: false }).then((res) => {
          commit("set_serial_scene", res, params);
          return state.serial;
        }),
        api.pc.list({ msg: false }).then((res) => {
          commit("set_pc_scene", res, params);
          return state.pc;
        }),
        api.content.list({ msg: false }).then((res) => {
          commit("set_content_scene", res, params);
          return state.content;
        }),
      ]);
    },
  },
};

export default scene;
