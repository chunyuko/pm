<template>
  <a-list item-layout="horizontal" :data-source="dataSource" size="large" :bordered="false" :loading="loading">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a slot="actions">
        <slot name="actions" v-bind="[item, index]" />
      </a>
      <!-- <a slot="actions">more</a> -->
      <a-list-item-meta>
        <a slot="title" href="javascript:0;"><slot name="title" v-bind="[item, index]" /></a>
        <div slot="avatar"><slot name="avatar" v-bind="[item, index]" /></div>
        <span slot="description"><slot name="description" v-bind="[item, index]" /></span>
      </a-list-item-meta>
      <div>{{ item.newUser }}</div>
    </a-list-item>
  </a-list>
</template>

<script>
export default {
  name: "HLRow",
  props: {
    source: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dataSource() {
      return [].concat(this.source);
    },
  },
  data() {
    return {};
  },
  methods: {
    // checkRule() {},
  },
};
</script>
>

<style scoped></style>
