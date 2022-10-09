<template>
  <div style="position: relative">
    <div v-for="(item, k) in keyData" :key="k" style="padding: 10px; white-space: nowrap">
      <span style="width: 100px; height: 20px; text-align: center; line-height: 20px; font-size: 14px">
        {{ item.title }}:
      </span>
      <a-divider type="vertical" />
      <a-tag
        v-for="(val, i) in getItems(k)"
        :key="i"
        :color="selected.indexOf(k + '-' + val[k]) < 0 ? '#C0C0C0' : 'blue'"
        @click="handleChange(k + '-' + val[k], i)"
      >
        <slot v-bind="[val, k]" name="keyValue">"未知"</slot>
      </a-tag>
    </div>
    <div style="position: absolute; bottom: 10px; right: 0" v-if="btnGroup == true">
      <a-button type="primary" @click="refresh" style="margin-right: 10px">清空</a-button>
      <a-button type="default" @click="close">关闭</a-button>
    </div>
  </div>
</template>
<script>
import { is } from "@/core/utils.js";
export default {
  name: "Filtrate",
  props: {
    keyData: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Array,
      default: () => [],
    },
    destroy: { type: Boolean, default: true },
    btnGroup: { type: Boolean, default: true },
  },
  computed: {
    // srcData() {
    //   // 查询结果数据
    //   return [].concat(this.data);
    // },
    // origin() {
    //   return [].concat(this.data);
    // },
  },
  data() {
    return {
      origin: [],
      result: [],
      selected: [],
    };
  },
  beforeDestroy() {
    console.log("销毁查询组件时是否清空：", this.destroy);
    this.destroy && this.clear();
  },
  mounted() {
    // this.origin = [].concat(this.data);
    this.setOriginData(this.data);
  },
  created() {},
  methods: {
    setOriginData(data) {
      this.origin = [].concat(data);
    },
    reload(data) {
      this.setOriginData(data);
      this.destroy ? this.close() : this.clear();
    },
    clear() {
      this.refresh();
      this.$emit("close", this.origin);
    },
    refresh() {
      // 重新渲染查询数据
      this.$emit("change", this.origin);
      this.selected = [];
    },
    close() {
      this.$emit("close", this.origin);
    },
    //条件切换
    handleChange(val, i) {
      let index = this.selected.indexOf(val);
      index > -1 ? this.selected.splice(index, 1) : this.selected.push(val);
      this.selected.length > 0 ? this.search() : this.refresh();
      // this.$emit("filtr-datas", this.filtrDatas, this.selected);
    },
    search() {
      let keyValue = {};
      this.selected.forEach((element) => {
        let item = element.split("-");
        let key = item[0],
          value = item[1];
        keyValue[key] = keyValue[key] ? keyValue[key] : [];
        keyValue[key].push(value);
      });

      this.result = this.origin.filter((val, index) => {
        let res = [];
        for (let key in keyValue) {
          let value = keyValue[key];
          res.push(value.some((v, i) => val[key] == v));
        }
        return res.every((v) => v);
      });
      this.$emit("change", this.result);
    },
    getItems(k) {
      let tar = [];
      return this.origin.filter((val, i) => {
        let v = val[k];
        // v 三种情况: 字符,对象,数组
        return is(v, "string") && !tar.includes(v) && tar.push(v);
      });
    },
  },
};
</script>
<style scoped></style>
