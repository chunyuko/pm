<template>
  <a-drawer
    ref="base"
    :title="title"
    placement="right"
    :closable="true"
    :visible="visible"
    :width="width"
    :zIndex="zIndex"
    :maskClosable="maskClosable"
    @close="close"
  >
    <!-- <slot name="default">
      <empty description="无数据" />
    </slot> -->
    <slot v-bind="content">
      <a-empty description="无数据" />
    </slot>
    <div class="bottomArea">
      <slot name="bottom"></slot>
    </div>
    <a-drawer
      ref="detail"
      :title="titleDetail"
      placement="right"
      :closable="true"
      :visible="detail.visible"
      :maskClosable="maskClosable"
      @close="close_detail"
      :width="width"
      :zIndex="zIndex"
    >
      <slot name="detail" v-bind="content">
        <a-empty description="无数据" />
      </slot>
      <div class="bottomArea">
        <slot name="bottomDetail"></slot>
      </div>
    </a-drawer>
  </a-drawer>
</template>

<script>
import { Drawer, Empty } from "ant-design-vue";
export default {
  name: "HRDrawer",
  props: Object.assign({}, Drawer.props, {
    width: {
      type: Number,
      default: 500,
    },
    zIndex: {
      type: Number,
      default: 1000,
    },
    title: {
      type: String,
      default: "配置面板",
    },
    titleDetail: {
      type: String,
      default: "配置面板",
    },
  }),
  computed: {
    // show: {
    //   get() {
    //     return this.visible;
    //   },
    //   set(val) {
    //     return val;
    //   },
    // },
  },
  data() {
    return {
      content: { name: "lqq" },
      detail: { visible: false },
    };
  },
  created() {
    // this.show = this.visible ? this.visible : false;
  },
  mounted() {
    let index = this.$refs.base.zIndex;
  },
  methods: {
    close(e) {
      this.$emit("onClose");
    },
    close_detail() {
      this.detail.visible = false;
    },
    open_detail() {
      this.detail.visible = true;
    },
  },
};
</script>

<style scoped>
.bottomArea {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e9e9e9;
  padding: 10px 16px;
  background: #fff;
  text-align: right;
  z-index: 1;
}
</style>
