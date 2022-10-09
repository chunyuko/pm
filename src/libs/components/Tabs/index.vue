<template>
  <a-card
    style="width: 100%"
    :bordered="false"
    :tabList="source"
    tabPosition="left"
    :activeTabKey="activeTab"
    @tabChange="(key) => handleTabChange(key, 'noTitleKey')"
    class="listCard"
  >
    <slot v-bind="[activeTab]"><a-empty description="无数据" /></slot>
  </a-card>
</template>

<script>
import { is } from "@/core/utils";
export default {
  name: "HTabs",
  props: {
    source: {
      type: Array,
      default: () => [],
    },
    tab: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      activeTab: "",
    };
  },
  mounted() {
    this.activeTab = this.tab ? this.tab : is(this.source, "array") && this.source.length > 0 ? this.source[0].key : "";
  },
  methods: {
    handleTabChange(key) {
      this.activeTab = key;
      this.$emit("tabChange", key);
    },
  },
};
</script>

<style scoped></style>
